<template>
  <div class="login-page d-flex align-items-center min-vh-100 bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div class="card-body p-5">
              
              <div class="mb-4 text-center text-sm-start">
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
                    <a href="#" class="text-decoration-none small" data-bs-toggle="modal" data-bs-target="#helpModal">Lupa email?</a>
                  </div>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0 text-muted">
                      <i class="bi bi-envelope"></i>
                    </span>
                    <input v-model="form.email" type="email" class="form-control bg-light border-start-0 ps-0" placeholder="name@example.com">
                  </div>
                </div>

                <div class="mb-4">
                  <div class="d-flex justify-content-between">
                    <label class="form-label fw-semibold">Password</label>
                    <a href="#" class="text-decoration-none small" data-bs-toggle="modal" data-bs-target="#helpModal">Lupa password?</a>
                  </div>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0 text-muted">
                      <i class="bi bi-lock"></i>
                    </span>
                    <input v-model="form.password" type="password" class="form-control bg-light border-start-0 ps-0" placeholder="••••••••">
                  </div>
                </div>

                <button type="submit" class="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm mt-2" :disabled="loading">
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

    <Teleport to="body">
      <div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header border-0 pb-0">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center px-4 pb-5">
              <div class="mb-4">
                <div class="bg-primary bg-opacity-10 d-inline-block p-4 rounded-circle mb-3">
                  <i class="bi bi-headset text-primary display-6"></i>
                </div>
                <h4 class="fw-bold text-dark">Butuh Bantuan Akses?</h4>
                <p class="text-muted mx-auto" style="max-width: 320px;">
                  Demi keamanan data pribadi Anda, proses pemulihan akun dilakukan secara manual oleh tim IT kami.
                </p>
              </div>
              
              <div class="card bg-light border-0 rounded-3 p-3 mb-3">
                <p class="small text-muted mb-1">Hubungi Administrator kami:</p>
                <a href="mailto:admin@eajdisc.test" class="h5 fw-bold text-primary text-decoration-none">
                  admin@eajdisc.test
                </a>
              </div>
              
              <p class="small text-muted mb-0 italic">
                Sebutkan Nama Lengkap & Reset Password / Email Anda saat mengirim email.
              </p>
            </div>
            <div class="modal-footer border-0 p-3">
              <button type="button" class="btn btn-light w-100 rounded-3 py-2 fw-semibold" data-bs-dismiss="modal">Saya Mengerti</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { useLogin } from '@/compose/useLogin';

const { form, loading, handleLogin } = useLogin();
</script>

<style scoped src="@/styles/Login.css"></style>