<template>
  <div class="disc-test-wrapper">
    <div class="background-overlay"></div>
    
    <div class="container">
      <div class="main-card">
        <div class="disc-header text-center mb-4">
          <div class="badge-wrapper mb-3">
            <img src="/eaj.png" width="150">
          </div>
          <div class="logout-wrapper text-start mb-3">
            <router-link to="/user" class="btn-back text-decoration-none">
              <i class="bi bi-arrow-left me-1"></i> Kembali ke Tes
            </router-link>
          </div>
          <h2 class="disc-title mb-2">Change Password</h2>
          <p class="disc-subtitle">Perbarui kata sandi akun Anda untuk keamanan</p>
        </div>

        <div class="form-container px-lg-5">
          <form @submit.prevent="handleSubmit">
            <div v-if="errorMessage" class="alert alert-danger d-flex align-items-center mb-4 border-0 rounded-3">
                <i class="bi bi-exclamation-circle-fill me-2"></i>
                <div>{{ errorMessage }}</div>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold text-dark">Password Saat Ini</label>
              <div class="input-group">
                <span class="input-group-text bg-light border-end-0">
                  <i class="bi bi-shield-lock text-muted"></i>
                </span>
                <input 
                  v-model="passwordForm.current" 
                  type="password" 
                  class="form-control bg-light border-start-0 ps-0" 
                  placeholder="Masukkan password lama"
                  required
                >
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold text-dark">Password Baru</label>
              <div class="input-group">
                <span class="input-group-text bg-light border-end-0">
                  <i class="bi bi-key text-muted"></i>
                </span>
                <input 
                  v-model="passwordForm.new" 
                  type="password" 
                  class="form-control bg-light border-start-0 ps-0" 
                  placeholder="Minimal 8 karakter"
                  required
                >
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold text-dark">Konfirmasi Password Baru</label>
              <div class="input-group">
                <span class="input-group-text bg-light border-end-0">
                  <i class="bi bi-check2-circle text-muted"></i>
                </span>
                <input 
                  v-model="passwordForm.confirm" 
                  type="password" 
                  class="form-control bg-light border-start-0 ps-0" 
                  placeholder="Ulangi password baru"
                  required
                >
              </div>
            </div>

            <div class="navigation-buttons mt-5">
              <router-link to="/user" class="btn-secondary-custom text-decoration-none text-center">
                Batal
              </router-link>
              <button 
                type="submit" 
                class="btn-primary-custom" 
                style="background-color: #7d5fff;"
                :disabled="loading"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                {{ loading ? 'Menyimpan...' : 'Update Password' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="showSuccess" class="modal-overlay">
      <div class="success-modal">
        <div class="success-icon" style="background-color: #28a745;">
          <i class="bi bi-shield-check"></i>
        </div>
        <h4 class="mb-2">Update Berhasil!</h4>
        <p class="text-muted mb-4">Password Anda telah berhasil diperbarui.</p>
        <button class="btn-primary-custom w-100" @click="handleSuccessClose">OK, Saya Mengerti</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; 
import Swal from 'sweetalert2'; 

const router = useRouter();
const loading = ref(false);
const errorMessage = ref('');

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
});

const handleSubmit = async () => {
  errorMessage.value = '';

  const userData = localStorage.getItem('user');
  if (!userData) {
    Swal.fire({
      icon: 'error',
      title: 'Sesi Berakhir',
      text: 'Silakan login kembali untuk melanjutkan.',
      confirmButtonColor: '#7d5fff',
    });
    return;
  }

  const user = JSON.parse(userData);
  const userEmail = user.email;

  if (passwordForm.value.new !== passwordForm.value.confirm) {
    errorMessage.value = "Konfirmasi password baru tidak cocok.";
    return;
  }

  if (passwordForm.value.new.length < 8) {
    errorMessage.value = "Password baru minimal harus 8 karakter.";
    return;
  }

  loading.value = true;
  
  try {
    const response = await axios.post('/api/change-password', {
      email: userEmail,
      current_password: passwordForm.value.current,
      new_password: passwordForm.value.new,
      new_password_confirmation: passwordForm.value.confirm
    });

    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Update Berhasil!',
        text: 'Password Anda telah berhasil diperbarui.',
        confirmButtonColor: '#7d5fff',
        timer: 3000,
        timerProgressBar: true
      }).then(() => {
        router.push('/user'); 
      });

      passwordForm.value = { current: '', new: '', confirm: '' };
    }
  } catch (error) {
    const msg = error.response?.data?.message || "Gagal mengubah password.";
    errorMessage.value = msg;

    Swal.fire({
      icon: 'error',
      title: 'Gagal Update',
      text: msg,
      confirmButtonColor: '#7d5fff',
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped src="@/styles/ChangePassword.css"></style>