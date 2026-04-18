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

<style scoped src="@/styles/HasilPage.css"></style>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const restartTest = () => {
  localStorage.removeItem('disc_test_progress');
  router.push('/');
};
</script>