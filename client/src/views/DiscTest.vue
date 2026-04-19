<template>
  <div class="disc-test-wrapper">
    <div class="background-overlay"></div>
    
    <div class="container">
      <div class="main-card">
        <div class="disc-header text-center mb-4">
          <div class="badge-wrapper mb-3">
            <img src="/eaj.png" width="150">
            <span class="question-badge">{{ currentNo }}/24</span>
          </div>
          <div class="logout-wrapper text-end mb-3">
            <router-link 
              to="/user/change-password" 
              class="btn-chapwd text-decoration-none d-inline-block"
              :class="{ 'pe-none opacity-50': loading }"
            >
              <i class="bi bi-lock me-1"></i> Change Password
            </router-link>&nbsp;
            <button 
              @click="handleLogout" 
              class="btn-logout"
              :disabled="loading"
            >
              <i class="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
          <h2 class="disc-title mb-2">DISC Personality Test</h2>
          <p class="disc-subtitle">Tes Kepribadian untuk Mengenal Gaya Perilaku Anda</p>
        </div>

        <div class="info-section mb-4">
          <div class="info-card">
            <div class="info-content">
              <p class="mb-3">
                Dari 4 pernyataan di bawah, pilihlah:
              </p>
              <div class="instruction-grid">
                <div class="instruction-item paling-item">
                  <div class="instruction-icon">
                    <span class="icon-badge p-badge">P</span>
                  </div>
                  <div class="instruction-text">
                    <strong>PALING</strong> menggambarkan diri Anda
                  </div>
                </div>
                <div class="instruction-item kurang-item">
                  <div class="instruction-icon">
                    <span class="icon-badge k-badge">K</span>
                  </div>
                  <div class="instruction-text">
                    <strong>KURANG</strong> menggambarkan diri Anda
                  </div>
                </div>
              </div>
              <div class="tips-box mt-3">
                <i class="bi bi-lightbulb me-2"></i>
                <small><strong>Tip:</strong> Jawablah sesuai kondisi Anda yang sebenarnya. Progress Anda otomatis tersimpan!</small>
              </div>
            </div>
          </div>
        </div><br>

        <p class="question-badge2" id="nomorSoal">SOAL NO. {{ currentNo }}</p><br><br>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Memuat soal...</p>
        </div>

        <div v-else class="options-container" style="background-color: lightblue;">
          <div class="options-list">
            <div 
              v-for="(opt, index) in options" 
              :key="index"
              class="option-item"
              :class="{
                'is-selected-p': selectedP === opt.pilihan_teks,
                'is-selected-k': selectedK === opt.pilihan_teks,
                'is-disabled-p': selectedK === opt.pilihan_teks,
                'is-disabled-k': selectedP === opt.pilihan_teks
              }"
            >
              <div class="option-text">
                <h4>{{ opt.pilihan_teks }}</h4>
              </div>
              
              <div class="selection-group">
                <label 
                  class="selection-option paling"
                  :class="{ 
                    active: selectedP === opt.pilihan_teks,
                    disabled: selectedK === opt.pilihan_teks
                  }"
                  @click="selectPaling(opt.pilihan_teks)"
                >
                  <div class="selection-content">
                    <div class="checkmark-wrapper">
                      <i class="bi bi-check-lg checkmark"></i>
                    </div>
                    <span class="selection-label">P</span>
                  </div>
                </label>

                <label 
                  class="selection-option kurang"
                  :class="{ 
                    active: selectedK === opt.pilihan_teks,
                    disabled: selectedP === opt.pilihan_teks
                  }"
                  @click="selectKurang(opt.pilihan_teks)"
                >
                  <div class="selection-content">
                    <div class="checkmark-wrapper">
                      <i class="bi bi-check-lg checkmark"></i>
                    </div>
                    <span class="selection-label">K</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="navigation-buttons mt-5">
          <button 
            class="btn-secondary-custom"
            @click="prevSoal"
            :disabled="currentNo === 1 || loading"
          >
            <i class="bi bi-chevron-left me-2"></i>Sebelumnya
          </button>
          
          <div class="button-group mt-5">
            <button 
              class="btn-primary-custom" style="background-color: #7d5fff;"
              @click="nextSoal"
              :disabled="!selectedP || !selectedK || loading"
            >
              {{ currentNo === 24 ? 'Lihat Hasil →' : 'Lanjut →' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="modal-overlay" @click="closeSuccess">
      <div class="success-modal" @click.stop>
        <div class="success-icon">
          <i class="bi bi-check-lg"></i>
        </div>
        <h4 class="mb-2">Berhasil Disimpan!</h4>
        <p class="text-muted mb-3">Jawaban Anda telah tersimpan otomatis</p>
        <button class="btn-primary-custom" @click="closeSuccess">Lanjutkan</button>
      </div>
    </div>

    <!-- Warning Modal untuk Leave Page -->
    <div v-if="showLeaveWarning" class="modal-overlay" @click="cancelLeave">
      <div class="success-modal" @click.stop>
        <div class="success-icon bg-warning">
          <i class="bi bi-exclamation-triangle"></i>
        </div>
        <h4 class="mb-2">Tinggalkan Halaman?</h4>
        <p class="text-muted mb-3">Progress Anda sudah tersimpan, tetapi Anda mungkin perlu melanjutkan nanti.</p>
        <div class="d-flex gap-2 justify-content-center">
          <button class="btn-secondary-custom" @click="cancelLeave">Batal</button>
          <button class="btn-primary-custom" @click="confirmLeave">Tinggalkan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/DiscTest.css"></style>

<script setup>
import { useDiscTest } from '@/compose/useDiscTest';

const {
  currentNo, options, selectedP, selectedK, showSuccess, loading, showLeaveWarning,
  selectPaling, selectKurang, nextSoal, prevSoal, closeSuccess, cancelLeave, confirmLeave, handleLogout
} = useDiscTest();
</script>