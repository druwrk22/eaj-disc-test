<template>
  <div class="hasil-container">
    <div v-if="loading" class="text-center mt-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Sedang mengambil dan menghitung skor Anda...</p>
    </div>

    <div v-else-if="error" class="text-center mt-5">
      <p class="text-danger">{{ error }}</p>
      <button class="btn btn-primary" @click="router.push('/')">Kembali ke Home</button>
    </div>

    <div v-else class="hasil-card" id="hasil-content">
      <div class="hasil-header text-center mb-4">
        <img src="/eaj.png" width="250">
        <h1 class="hasil-title">Hasil DISC Test Anda</h1>
        <p class="hasil-subtitle">Mengenal Profil Kepribadian Anda</p>
      </div>

      <div class="hasil-content text-center">
        <div class="score-grid d-flex justify-content-around mb-4">
          <div v-for="(score, type) in finalScore" :key="type" class="score-item">
            <h2 :class="['display-4', type === dominantType ? 'text-primary fw-bold' : '']">{{ score }}</h2>
            <p class="fw-bold">{{ type }}</p>
          </div>
        </div>

        <div class="interpretation-box p-4 bg-light rounded mb-4">
          <h3>Tipe Dominan: <span class="text-primary">{{ dominantType }}</span></h3>
          <p class="mt-3">{{ interpretation }}</p>
        </div>

        <div class="d-flex justify-content-center gap-2 no-print">
          <button class="btn-danger-custom" @click="downloadPDF">
            <i class="bi bi-file-earmark-pdf me-2"></i>Download PDF
          </button>
          <button class="btn-primary-custom" @click="restartTest">
            <i class="bi bi-arrow-clockwise me-2"></i>Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/HasilPage.css"></style>
<style scoped>
@media print {
  .no-print { display: none; }
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const router = useRouter();
const loading = ref(true);
const error = ref(null);
const finalScore = ref({ D: 0, I: 0, S: 0, C: 0 });

const descriptions = {
  D: "Anda adalah orang yang Direct, Decisive, dan Driven. Anda fokus pada hasil dan tantangan.",
  I: "Anda adalah orang yang Influential, Optimistic, dan Outgoing. Anda suka berinteraksi dengan orang lain.",
  S: "Anda adalah orang yang Steady, Patient, dan Loyal. Anda menghargai harmoni dan kerjasama tim.",
  C: "Anda adalah orang yang Conscientious, Analytical, dan Precise. Anda sangat detail dan taat aturan."
};

onMounted(async () => {
  await getRealData();
});

const getRealData = async () => {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) throw new Error("Sesi berakhir, silakan login kembali.");
    
    const user = JSON.parse(userData);
    const userId = user.id;

    const resUser = await axios.get(`api/result/${userId}`);
    const resMaster = await axios.get(`api/master-questions`);

    const rawAnswers = resUser.data.data || resUser.data;
    const rawMasters = resMaster.data.data || resMaster.data;

    if (!Array.isArray(rawAnswers)) {
      throw new Error("Answers is not an array");
    }

    if (!Array.isArray(rawMasters)) {
      throw new Error("Master data is not an array");
    }

    calculateDISC(rawAnswers, rawMasters);

  } catch (err) {
    console.error("Fetch Error:", err);
    error.value = "Gagal memproses data: " + (err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};

const calculateDISC = (answers, masters) => {
  const scores = { D: 0, I: 0, S: 0, C: 0 };

  answers.forEach(ans => {
    const match = masters.find(m => 
      m.nomor === ans.nomor && 
      m.pilihan_teks.trim() === ans.pilihan_paling.trim()
    );

    if (match && match.kategori) {
      const cat = match.kategori.toUpperCase();
      if (scores.hasOwnProperty(cat)) {
        scores[cat]++;
      }
    }
  });

  finalScore.value = scores;
};

const dominantType = computed(() => {
  const scores = finalScore.value;
  return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
});

const interpretation = computed(() => descriptions[dominantType.value]);

const downloadPDF = async () => {
  const element = document.getElementById('hasil-content');
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`Hasil_DISC_${dominantType.value}.pdf`);
};

const restartTest = () => {
  localStorage.removeItem('disc_test_progress');
  router.push('/');
};
</script>