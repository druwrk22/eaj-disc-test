<template>
  <!-- Wrapper dengan Background Image -->
  <div class="disc-test-wrapper">
    <!-- Overlay Gradient -->
    <div class="background-overlay"></div>
    
    <!-- Main Content -->
    <div class="container">
      <div class="main-card">
        <!-- Header DISC Test -->
        <div class="disc-header text-center mb-4">
          <div class="badge-wrapper mb-3">
            <img src="/eaj.png" width="150">
            <span class="question-badge">{{ currentNo }}/24</span>
          </div>
          <h2 class="disc-title mb-2">DISC Personality Test</h2>
          <p class="disc-subtitle">Tes Kepribadian untuk Mengenal Gaya Perilaku Anda</p>
        </div>

        <!-- Info Box dengan Petunjuk Lengkap -->
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

        <!-- Loading State -->
        <p class="question-badge2" id="nomorSoal">SOAL NO. {{ currentNo }}</p><br><br>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Memuat soal...</p>
        </div>

        <!-- Options Container -->
        <div v-else class="options-container">
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
                <span>{{ opt.pilihan_teks }}</span>
              </div>
              
              <!-- Selection Options - Sejajar -->
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

        <!-- Navigation -->
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
              class="btn-primary-custom"
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

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'; 

const router = useRouter();

const STORAGE_KEY = 'disc_test_progress';

const currentNo = ref(1);
const options = ref([]);
const selectedP = ref(null);
const selectedK = ref(null);
const showSuccess = ref(false);
const loading = ref(true);
const showLeaveWarning = ref(false);
const pendingLeave = ref(null);

// Load progress dari localStorage
const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      if (data.currentNo) currentNo.value = data.currentNo;
      if (data.answers) {
        // Restore answers jika ada
        const currentAnswers = data.answers[data.currentNo];
        if (currentAnswers) {
          selectedP.value = currentAnswers.paling;
          selectedK.value = currentAnswers.kurang;
        }
      }
      return true;
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  return false;
};

// Save progress ke localStorage
const saveProgress = () => {
  try {
    const progress = {
      currentNo: currentNo.value,
      answers: {
        [currentNo.value]: {
          paling: selectedP.value,
          kurang: selectedK.value
        }
      },
      timestamp: new Date().toISOString()
    };
    
    // Merge dengan existing data jika ada
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      const parsed = JSON.parse(existing);
      progress.answers = { ...parsed.answers, ...progress.answers };
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

// Clear progress setelah tes selesai
const clearProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const fetchQuestion = async () => {
  try {
    loading.value = true;
    const res = await axios.get(`http://localhost:3000/questions/${currentNo.value}`);
    options.value = res.data;
    
    // Restore selection jika ada saved answer untuk soal ini
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      const currentAnswers = data.answers?.[currentNo.value];
      if (currentAnswers) {
        selectedP.value = currentAnswers.paling;
        selectedK.value = currentAnswers.kurang;
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
};

const selectPaling = (value) => {
  if (selectedK.value === value) return;
  selectedP.value = selectedP.value === value ? null : value;
  // Auto-save ke localStorage
  saveProgress();
};

const selectKurang = (value) => {
  if (selectedP.value === value) return;
  selectedK.value = selectedK.value === value ? null : value;
  // Auto-save ke localStorage
  saveProgress();
};

const saveDraft = async () => {
  await submitAnswer();
  showSuccess.value = true;
};

const closeSuccess = () => {
  showSuccess.value = false;
};

const submitAnswer = async () => {
  if (!selectedP.value || !selectedK.value) return;
  
  try {
    await axios.post('http://localhost:3000/submit-answer', {
      nomor: currentNo.value,
      paling: selectedP.value,
      kurang: selectedK.value
    });
    // Update progress setelah sukses submit
    saveProgress();
  } catch (error) {
    console.error('Error saving:', error);
    // Tetap save ke localStorage sebagai backup
    saveProgress();
  }
};

const scrollToNomorSoal = () => {
  const element = document.getElementById('nomorSoal');
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center' 
    });
  }
};

const nextSoal = async () => {
  if (!selectedP.value || !selectedK.value) return;
  
  await submitAnswer();

  if (currentNo.value < 24) {
    currentNo.value++;
    saveProgress();
    await fetchQuestion();
    scrollToNomorSoal();
  } else {
    // 👇 Tes selesai - tampilkan Swal lalu redirect
    clearProgress();
    
    await Swal.fire({
      title: '🎉 Tes Selesai!',
      text: 'Mohon tunggu hasilnya...',
      icon: 'success',
      confirmButtonText: 'Lihat Hasil',
      confirmButtonColor: '#7d5fff',
      showCancelButton: false,
      allowOutsideClick: false,
      timer: 2000,
      timerProgressBar: true
    });
    
    router.push('/hasil'); // 👈 Redirect setelah Swal
  }
};

const prevSoal = async () => {
  if (currentNo.value > 1) {
    // Save current state sebelum pindah
    saveProgress();
    currentNo.value--;
    fetchQuestion();
    scrollToNomorSoal();
  }
};

// Prevent page refresh / close dengan warning
const handleBeforeUnload = (event) => {
  // Cek apakah tes belum selesai
  if (currentNo.value < 24) {
    event.preventDefault();
    event.returnValue = ''; // Required untuk Chrome
    return '';
  }
};

// Handle browser back button
const handlePopState = () => {
  if (currentNo.value > 1) {
    showLeaveWarning.value = true;
    pendingLeave.value = 'back';
  }
};

const cancelLeave = () => {
  showLeaveWarning.value = false;
  pendingLeave.value = null;
  // Push state kembali agar back button tidak berfungsi
  if (pendingLeave.value === 'back') {
    history.pushState({}, '', location.href);
  }
};

const confirmLeave = () => {
  showLeaveWarning.value = false;
  if (pendingLeave.value === 'back') {
    history.back();
  }
  pendingLeave.value = null;
};

// Lifecycle hooks
onMounted(async () => {
  // Load saved progress
  loadProgress();
  
  // Fetch question
  await fetchQuestion();
  
  // Register event listeners
  window.addEventListener('beforeunload', handleBeforeUnload);
  window.addEventListener('popstate', handlePopState);
  
  // Push state untuk handle back button
  history.pushState({}, '', location.href);
});

onUnmounted(() => {
  // Cleanup event listeners
  window.removeEventListener('beforeunload', handleBeforeUnload);
  window.removeEventListener('popstate', handlePopState);
});
</script>

<style scoped>
/* Wrapper dengan Background Image */
.disc-test-wrapper {
  position: relative;
  min-height: 100vh;
  /* Background Image dari Unsplash - Abstract Gradient */
  background-color: white;
  padding: 2rem 1rem;
}

/* Overlay untuk keterbacaan */
/* .background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(125, 95, 255, 0.15) 0%, 
    rgba(255, 107, 157, 0.15) 50%,
    rgba(0, 0, 0, 0.4) 100%);
  backdrop-filter: blur(8px);
  z-index: 0;
} */

/* Container */
.container {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
}

/* Main Card */
.main-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2.5rem;
  /* box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); */
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Warning Icon */
.success-icon.bg-warning {
  background: orange;
  box-shadow: 0 8px 30px rgba(255, 193, 7, 0.4);
}

/* Spinner */
.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.3em;
}

/* Disabled button style */
.btn-secondary-custom:disabled,
.btn-save:disabled,
.btn-primary-custom:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* DISC Header */
.disc-header {
  padding: 1rem 0;
  border-bottom: 2px solid #f0f2ff;
  margin-bottom: 2rem;
}

.badge-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.question-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: black;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
}

.question-badge2 {
  display: inline-flex;
  background: lightcoral;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
}

.disc-title {
  color: #1a1a2e;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background-color: blueviolet;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.disc-subtitle {
  color: #8b8b9e;
  font-size: 1rem;
  font-weight: 400;
}

/* Info Section */
.info-section {
  margin-bottom: 2rem;
}

.info-card {
  background: linear-gradient(135deg, rgba(125, 95, 255, 0.05) 0%, rgba(255, 107, 157, 0.05) 100%);
  border: 2px solid #e8eaff;
  border-radius: 16px;
  overflow: hidden;
}

.info-content {
  padding: 1.5rem;
}

.info-content > p {
  color: #5a5a7a;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

/* Instruction Grid */
.instruction-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: white;
  border: 2px solid #e8eaff;
  transition: all 0.3s ease;
}

.instruction-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(125, 95, 255, 0.1);
}

.paling-item {
  border-left: 4px solid #7d5fff;
}

.kurang-item {
  border-left: 4px solid #ff6b9d;
}

.instruction-icon {
  flex-shrink: 0;
}

.icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
}

.p-badge {
  background-color: lightblue;
  /* background: linear-gradient(135deg, #7d5fff 0%, #ff6b9d 100%); */
  box-shadow: 0 4px 12px rgba(125, 95, 255, 0.3);
}

.k-badge {
  background-color: pink;
  /* background: linear-gradient(135deg, #ff6b9d 0%, #7d5fff 100%); */
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
}

.instruction-text {
  color: #5a5a7a;
  font-size: 0.9rem;
  line-height: 1.4;
}

.instruction-text strong {
  display: block;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.paling-item .instruction-text strong {
  color: #7d5fff;
}

.kurang-item .instruction-text strong {
  color: #ff6b9d;
}

/* Tips Box */
.tips-box {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%);
  border-left: 4px solid #ffc107;
  padding: 1rem;
  border-radius: 8px;
  color: #856404;
  display: flex;
  align-items: flex-start;
}

.tips-box i {
  color: #ffc107;
  font-size: 1.1rem;
  margin-top: 0.1rem;
}

/* Options Container */
.options-container {
  background: #f8f9ff;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e8eaff;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Option Item */
.option-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  align-items: center;
}

.option-item:hover:not(.is-disabled-p):not(.is-disabled-k) {
  transform: translateX(4px);
  box-shadow: 0 4px 20px rgba(125, 95, 255, 0.1);
  border-color: rgba(125, 95, 255, 0.2);
}

.option-item.is-selected-p {
  /* background: linear-gradient(135deg, rgba(125, 95, 255, 0.08) 0%, rgba(125, 95, 255, 0.05) 100%); */
  border-color: #7d5fff;
}

.option-item.is-selected-k {
  /* background: linear-gradient(135deg, rgba(255, 107, 157, 0.08) 0%, rgba(255, 107, 157, 0.05) 100%); */
  border-color: #ff6b9d;
}

.option-item.is-disabled-p,
.option-item.is-disabled-k {
  opacity: 0.5;
  cursor: not-allowed;
}

.option-text {
  display: flex;
  align-items: center;
  color: #2d2d44;
  font-weight: 500;
  font-size: 1rem;
}

/* Selection Group */
.selection-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.selection-option {
  position: relative;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.selection-option.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.selection-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  border: 2px solid #e8eaff;
  background: white;
  min-width: 90px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Checkmark Wrapper */
.checkmark-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.checkmark {
  font-size: 1.1rem;
  color: transparent;
  transform: scale(0) rotate(-45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.selection-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #8b8b9e;
  transition: all 0.3s ease;
}

/* Paling - Active State */
.selection-option.paling.active .selection-content {
  border-color: #7d5fff;
  /* background: linear-gradient(135deg, rgba(125, 95, 255, 0.1) 0%, rgba(125, 95, 255, 0.05) 100%); */
  box-shadow: 0 4px 15px rgba(125, 95, 255, 0.2);
}

.selection-option.paling.active .checkmark-wrapper {
  background-color: blue;
  /* background: linear-gradient(135deg, #7d5fff 0%, #ff6b9d 100%); */
  box-shadow: 0 4px 12px rgba(125, 95, 255, 0.3);
}

.selection-option.paling.active .checkmark {
  color: white;
  transform: scale(1) rotate(0deg);
}

.selection-option.paling.active .selection-label {
  color: #7d5fff;
}

/* Kurang - Active State */
.selection-option.kurang.active .selection-content {
  border-color: #ff6b9d;
  /* background: linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(255, 107, 157, 0.05) 100%); */
  box-shadow: 0 4px 15px rgba(255, 107, 157, 0.2);
}

.selection-option.kurang.active .checkmark-wrapper {
  background-color: red;
  /* background: linear-gradient(135deg, #ff6b9d 0%, #7d5fff 100%); */
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
}

.selection-option.kurang.active .checkmark {
  color: white;
  transform: scale(1) rotate(0deg);
}

.selection-option.kurang.active .selection-label {
  color: #ff6b9d;
}

/* Hover Effect */
.selection-option:not(.active):not(.disabled):hover .selection-content {
  border-color: #7d5fff;
  transform: translateY(-2px);
}

.selection-option:not(.active):not(.disabled):hover .checkmark-wrapper {
  background: #e8eaff;
}

/* Navigation Buttons */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f2ff;
}

.btn-secondary-custom {
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

.btn-secondary-custom:hover:not(:disabled) {
  border-color: #7d5fff;
  color: #7d5fff;
  transform: translateY(-2px);
}

.button-group {
  display: flex;
  gap: 1rem;
}

.btn-save {
  background: white;
  color: #7d5fff;
  border: 2px solid #7d5fff;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.btn-save:hover:not(:disabled) {
  background: rgba(125, 95, 255, 0.08);
  transform: translateY(-2px);
}

.btn-primary-custom {
  /* background: linear-gradient(135deg, #7d5fff 0%, #ff6b9d 100%); */
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

.btn-primary-custom:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(125, 95, 255, 0.4);
}

.btn-primary-custom:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Success Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.success-modal {
  background: white;
  padding: 3rem;
  border-radius: 24px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(125, 95, 255, 0.3);
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
  color: white;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .disc-test-wrapper {
    padding: 1rem;
  }
  
  .main-card {
    padding: 1.5rem;
  }
  
  .disc-title {
    font-size: 1.5rem;
  }
  
  .instruction-grid {
    grid-template-columns: 1fr;
  }
  
  .option-item {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .selection-group {
    justify-content: flex-end;
  }
  
  .navigation-buttons {
    flex-direction: column;
  }
  
  .button-group {
    width: 100%;
    flex-direction: column;
  }
  
  .btn-secondary-custom,
  .btn-save,
  .btn-primary-custom {
    width: 100%;
  }
}
</style>