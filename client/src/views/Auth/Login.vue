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
                      required
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
                      required
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
const form = ref({ email: '', password: '' });
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    const res = await axios.post('/api/auth/login', form.value); 
    localStorage.setItem('token', res.data.token);

    const userRole = res.data.user.role;
    if (userRole === 'admin') {
      window.location.href = '/admin';
    } else if (userRole === 'hrd') {
      window.location.href = '/hrd';
    } else {
      window.location.href = '/user';
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Terjadi kesalahan sistem');
  } finally {
    loading.value = false;
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