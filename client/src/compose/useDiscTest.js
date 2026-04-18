import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'; 

export function useDiscTest() {
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

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Keluar dari Akun?',
      text: 'Anda akan logout dan progress tes akan dihapus.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      loading.value = true;
      
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('disc_test_progress'); 
        
        await Swal.fire({
          title: 'Berhasil Logout! 👋',
          text: 'Sampai jumpa lagi!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

        router.push('/login');
        
      } catch (error) {
        console.error('Logout error:', error);
        router.push('/login');
      } finally {
        loading.value = false;
      }
    }
  };

  const loadProgress = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.currentNo) currentNo.value = data.currentNo;
        if (data.answers) {
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

  const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const fetchQuestion = async () => {
    try {
      loading.value = true;
      const res = await axios.get(`http://localhost:3000/questions/${currentNo.value}`);
      options.value = res.data;
      
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
    saveProgress();
  };

  const selectKurang = (value) => {
    if (selectedP.value === value) return;
    selectedK.value = selectedK.value === value ? null : value;
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
      const userData = localStorage.getItem('user');
        const user = userData ? JSON.parse(userData) : null;
        if (!user || !user.id) {
            alert('User tidak terautentikasi. Silakan login ulang.');
            return;
        }

      await axios.post('http://localhost:3000/submit-answer', {
        nomor: currentNo.value,
        paling: selectedP.value,
        kurang: selectedK.value,
        user_id: user.id
      });

      saveProgress();
    } catch (error) {
      console.error('Error saving:', error);
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
      
      router.push('/hasil'); 
    }
  };

  const prevSoal = async () => {
    if (currentNo.value > 1) {
      saveProgress();
      currentNo.value--;
      fetchQuestion();
      scrollToNomorSoal();
    }
  };

  const handleBeforeUnload = (event) => {
    if (currentNo.value < 24) {
      event.preventDefault();
      event.returnValue = ''; 
      return '';
    }
  };

  const handlePopState = () => {
    if (currentNo.value > 1) {
      showLeaveWarning.value = true;
      pendingLeave.value = 'back';
    }
  };

  const cancelLeave = () => {
    showLeaveWarning.value = false;
    pendingLeave.value = null;
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

  onMounted(async () => {
    loadProgress();
    
    await fetchQuestion();
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    
    history.pushState({}, '', location.href);
  });

  onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    window.removeEventListener('popstate', handlePopState);
  });

  return {
    currentNo,
    options,
    selectedP,
    selectedK,
    showSuccess,
    loading,
    showLeaveWarning,
    selectPaling,
    selectKurang,
    nextSoal,
    prevSoal,
    closeSuccess,
    cancelLeave,
    confirmLeave,
    handleLogout
  };
}