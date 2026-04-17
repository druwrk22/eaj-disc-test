<template>
  <div class="login-page d-flex">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-8">
          <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div class="card-body p-5">
              
              <div class="mb-4">
                <div class="brand-logo mb-3">
                  <i class="bi bi-shield-lock-fill text-primary display-4"></i>
                </div>
                <h3 class="fw-bold text-dark">Welcome Back</h3>
                <p class="text-muted small">Silakan masuk ke akun DISC Anda</p>
              </div>

              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <div class="d-flex justify-content-between">
                    <label class="form-label fw-semibold">Email</label>
                    <a href="#" class="text-decoration-none small">Lupa email?</a>
                  </div>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0 text-muted">
                      <i class="bi bi-envelope"></i>
                    </span>
                    <input 
                      v-model="form.email" 
                      type="email" 
                      class="form-control bg-light border-start-0 ps-0" 
                      placeholder="name@example.com"
                    >
                  </div>
                </div>

                <div class="mb-4">
                  <div class="d-flex justify-content-between">
                    <label class="form-label fw-semibold">Password</label>
                    <a href="#" class="text-decoration-none small">Lupa password?</a>
                  </div>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0 text-muted">
                      <i class="bi bi-lock"></i>
                    </span>
                    <input 
                      v-model="form.password" 
                      type="password" 
                      class="form-control bg-light border-start-0 ps-0" 
                      placeholder="••••••••"
                    >
                  </div>
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm mt-2"
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? 'Authenticating...' : 'Sign In' }}
                </button>
              </form>

              <div class="text-center mt-4">
                <p class="small text-muted mb-0">
                  Belum punya akun? 
                  <router-link to="/register" class="fw-bold text-decoration-none">Daftar Sekarang</router-link>
                </p>
              </div>

            </div>
          </div>
          
          <p class="text-center text-muted mt-4 small opacity-50">
            &copy; 2026 EAJ Project DISC System
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; 
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const form = ref({ email: '', password: '' });
const loading = ref(false);

const handleLogin = async () => {
  if (!form.value.email || !form.value.password) {
    Swal.fire({
      icon: 'warning',
      title: 'Data Tidak Lengkap',
      text: 'Email dan password wajib diisi!',
      confirmButtonColor: '#0d6efd'
    });
    return;
  }

  loading.value = true;

  Swal.fire({
    title: 'Signing in...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  try {
    const res = await axios.post('/api/auth/login', form.value);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    await Swal.fire({
      icon: 'success',
      title: 'Login Berhasil!',
      text: `Selamat datang, ${res.data.user.name}!`,
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: '#0d6efd'
    });

    const userRole = res.data.user.role;
    if (userRole === 'admin') {
      router.push('/admin');
    } else if (userRole === 'hrd') {
      router.push('/hrd');
    } else {
      router.push('/user');
    }
  } catch (err) {
    const statusCode = err.response?.status;
    const message = err.response?.data?.message || 'Terjadi kesalahan sistem';

    if (statusCode === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: 'Email atau password yang Anda masukkan salah.',
        confirmButtonColor: '#dc3545',
        footer: '<a href="/forgot-password" class="small">Lupa password?</a>'
      });
    } 
    else if (statusCode === 400) {
      const errors = err.response?.data?.errors;
      let errorText = message;
      
      if (Array.isArray(errors) && errors.length > 0) {
        errorText = errors.map(e => `• ${e.message}`).join('\n');
      }

      Swal.fire({
        icon: 'warning',
        title: 'Validasi Gagal',
        text: errorText,
        confirmButtonColor: '#ffc107'
      });
    } 
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        confirmButtonColor: '#dc3545'
      });
    }
  } finally {
    loading.value = false;
    
    if (Swal.isLoading()) {
      Swal.close();
    }
  }
};
</script>

<style scoped>
/* Styling Tambahan */
.input-group-text {
  border-radius: 0.5rem 0 0 0.5rem !important;
}

.form-control {
  border-radius: 0 0.5rem 0.5rem 0 !important;
  padding: 0.6rem;
}

.form-control:focus {
  box-shadow: none;
  border-color: #dee2e6;
}

.btn-primary {
  background-color: #0d6efd;
  border: none;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  transform: scale(1.02);
}
</style>