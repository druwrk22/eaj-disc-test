<template>
  <div class="register-page d-flex justify-content-center">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-6">
          <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div class="card-body p-5">
              
              <div class="text-center mb-4">
                <div class="brand-logo mb-3">
                  <i class="bi bi-person-plus-fill text-success display-4"></i>
                </div>
                <h3 class="fw-bold text-dark">Buat Akun</h3>
                <p class="text-muted small">Daftar untuk memulai tes DISC Anda</p>
              </div>

              <form @submit.prevent="handleRegister">
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <label class="form-label fw-semibold">Full Name</label>
                    <div class="input-group">
                      <span class="input-group-text bg-light border-end-0 text-muted">
                        <i class="bi bi-person"></i>
                      </span>
                      <input 
                        v-model="form.name" 
                        type="text" 
                        class="form-control bg-light border-start-0 ps-0" 
                        placeholder="John Doe"
                      >
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label fw-semibold">Email Address</label>
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

                  <div class="col-md-12 mb-4">
                    <label class="form-label fw-semibold">Password</label>
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
                </div>

                <button 
                  type="submit" 
                  class="btn btn-success w-100 py-2 fw-bold rounded-3 shadow-sm"
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? 'Creating Account...' : 'Register' }}
                </button>
              </form>

              <div class="text-center mt-4">
                <p class="small text-muted mb-0">
                  Sudah punya akun? 
                  <router-link to="/login" class="fw-bold text-decoration-none">Login di sini</router-link>
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

<style scoped src="@/styles/Register.css"></style>

<script setup>
import { useRegister } from '@/compose/useRegister';

const { form, loading, handleRegister } = useRegister();
</script>