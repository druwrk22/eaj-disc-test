<!-- src/views/HasilPage.vue -->
<template>
  <div class="hasil-container">
    <div class="hasil-card">
      <div class="hasil-header text-center mb-4">
        <img src="/eaj.png" width="250">
        <h1 class="hasil-title">halaman Sedang Dalam Pembuatan</h1>
        <p class="hasil-subtitle">Halaman Hasil DISC Test Anda</p>
      </div>

      <div class="hasil-content text-center">
        <p class="text-muted">
          Halaman hasil sedang dalam pengembangan...
        </p><br>
        <button class="btn-primary-custom mt-3" @click="restartTest">
          <i class="bi bi-arrow-clockwise me-2"></i>Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const restartTest = () => {
  localStorage.removeItem('disc_test_progress');
  router.push('/');
};
</script>

<style scoped>
.hasil-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.hasil-card {
  background: white;
  border-radius: 24px;
  padding: 3rem 2.5rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(125, 95, 255, 0.15);
  border: 1px solid #f0f2ff;
}

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
}

.hasil-title {
  background-color: blue;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  font-weight: 700;
}

.btn-primary-custom {
  background-color: green;
  color: white;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}
</style>