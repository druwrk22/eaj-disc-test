<template>
  <div class="hasil-container">
    <div class="hasil-card">
      <!-- Header -->
      <div class="hasil-header text-center mb-4">
        <div class="celebration-icon mb-3">
          <i class="bi bi-emoji-smile-fill"></i>
        </div>
        <h1 class="hasil-title">Hello World! 🎉</h1>
        <p class="hasil-subtitle">Halaman Hasil DISC Test Anda</p>
      </div>

      <!-- Content Placeholder -->
      <div class="hasil-content text-center">
        <div class="placeholder-box mb-4">
          <i class="bi bi-graph-up-arrow display-4 text-primary"></i>
        </div>
        <h5 class="mb-3">Hasil Analisis Anda Segera Muncul</h5>
        <p class="text-muted mb-4">
          Sistem sedang memproses jawaban Anda. 
          Fitur hasil lengkap akan segera tersedia!
        </p>
        
        <!-- Debug Info (opsional, hapus untuk production) -->
        <div class="debug-info p-3 rounded bg-light mb-4">
          <small class="text-muted d-block">
            <i class="bi bi-code-slash me-1"></i>
            Debug: Halaman ini adalah placeholder untuk route <code>/hasil</code>
          </small>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex gap-2 justify-content-center flex-wrap">
          <button class="btn-outline-custom" @click="router.back()">
            <i class="bi bi-arrow-left me-2"></i>Kembali
          </button>
          <button class="btn-primary-custom" @click="restartTest">
            <i class="bi bi-arrow-clockwise me-2"></i>Ulangi Tes
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="hasil-footer text-center mt-5 pt-3 border-top">
        <small class="text-muted">
          <i class="bi bi-shield-check me-1"></i>
          Data Anda aman dan terenkripsi
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const restartTest = () => {
  // Clear any remaining progress
  localStorage.removeItem('disc_test_progress');
  // Redirect ke halaman awal tes
  router.push('/');
};
</script>

<style scoped>
/* Container */
.hasil-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

/* Card */
.hasil-card {
  background: white;
  border-radius: 24px;
  padding: 3rem 2.5rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(125, 95, 255, 0.15);
  border: 1px solid #f0f2ff;
  animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Header */
.celebration-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background: linear-gradient(135deg, #7d5fff 0%, #ff6b9d 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  box-shadow: 0 10px 30px rgba(125, 95, 255, 0.4);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.hasil-title {
  color: #1a1a2e;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #7d5fff 0%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hasil-subtitle {
  color: #8b8b9e;
  font-size: 1.1rem;
}

/* Content */
.placeholder-box {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, rgba(125, 95, 255, 0.1) 0%, rgba(255, 107, 157, 0.1) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #e8eaff;
}

.placeholder-box i {
  font-size: 3rem;
}

.debug-info {
  border: 1px solid #e8eaff;
}

.debug-info code {
  background: #f0f2ff;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85em;
  color: #7d5fff;
}

/* Buttons */
.btn-outline-custom {
  background: white;
  color: #5a5a7a;
  border: 2px solid #e8eaff;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.btn-outline-custom:hover {
  border-color: #7d5fff;
  color: #7d5fff;
  transform: translateY(-2px);
}

.btn-primary-custom {
  background: linear-gradient(135deg, #7d5fff 0%, #ff6b9d 100%);
  color: white;
  border: none;
  padding: 0.875rem 2.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  box-shadow: 0 4px 20px rgba(125, 95, 255, 0.3);
}

.btn-primary-custom:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(125, 95, 255, 0.4);
}

/* Footer */
.hasil-footer {
  color: #8b8b9e;
  font-size: 0.85rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hasil-card {
    padding: 2rem 1.5rem;
  }
  
  .hasil-title {
    font-size: 1.5rem;
  }
  
  .celebration-icon {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
  
  .d-flex.gap-2 {
    flex-direction: column;
  }
  
  .btn-outline-custom,
  .btn-primary-custom {
    width: 100%;
  }
}
</style>