<template>
  <nav class="navbar-custom">
    <div class="nav-brand">
      <img src="/eaj.png" alt="Logo" class="nav-logo" />
      <span class="brand-text">Dashboard</span>
    </div>
    <div class="nav-actions">
      <button class="btn-logout" @click="handleLogout">
        <i class="bi bi-box-arrow-right me-1"></i> Logout
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar-custom {
  height: 70px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: sticky; /* Agar tetap di atas saat scroll */
  top: 0;
  z-index: 100;
}

.nav-logo {
  height: 40px;
  margin-right: 15px;
}

.brand-text {
  font-weight: 700;   
  font-size: 1.2rem;
  color: #1a1a2e;
}

.btn-logout {
  background: transparent;
  color: #dc3545;
  border: 2px solid #dc3545;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background: #dc3545;
  color: white;
}
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
  
const router = useRouter();
const loading = ref(false);

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Keluar dari Akun?',
    text: 'Anda akan logout dari sistem.',
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
</script>