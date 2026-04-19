<template>
  <div class="home-wrapper">
    <Navbar />
    <div class="layout-body">
      <Sidebar />
      <main class="main-content">
        <div class="container-fluid">
          <div class="main-card">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 class="disc-title mb-1">Manage Questions</h2>
                <p class="text-muted">Kelola data pertanyaan DISC</p>
              </div>
              <button class="btn-add" @click="openModal('add')">
                <i class="bi bi-plus-lg me-2"></i> Tambah Pertanyaan
              </button>
            </div>

            <div id="gridjs-wrapper"></div>
          </div>
        </div>
      </main>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content-custom">
        <h3>{{ isEditMode ? 'Edit Pertanyaan' : 'Tambah Pertanyaan' }}</h3>
        <hr>
        <div class="form-group mb-3">
          <label class="form-label">Nomor</label>
          <input type="number" v-model="formData.nomor" class="form-control" placeholder="Contoh: 1">
        </div>
        <div class="form-group mb-3">
          <label class="form-label">Pilihan Teks</label>
          <textarea v-model="formData.pilihan_teks" class="form-control" rows="2" placeholder="Masukkan teks pertanyaan"></textarea>
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Kategori (D/I/S/C)</label>
          <select v-model="formData.kategori" class="form-select">
            <option value="" disabled>Pilih Kategori</option>
            <option value="D">D (Dominance)</option>
            <option value="I">I (Influence)</option>
            <option value="S">S (Steadiness)</option>
            <option value="C">C (Compliance)</option>
          </select>
        </div>
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-light" @click="showModal = false">Batal</button>
          <button class="btn btn-primary-custom" @click="handleSubmit">
            {{ isEditMode ? 'Simpan Perubahan' : 'Simpan Data' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Swal from 'sweetalert2';
import axios from 'axios';
import Navbar from '../../components/Navbar.vue';
import Sidebar from '../../components/Sidebar.vue';

const showModal = ref(false);
const isEditMode = ref(false);
const originalKey = ref(''); 
const formData = ref({
  nomor: '',
  pilihan_teks: '',
  kategori: ''
});

let gridInstance = null;

const initGrid = () => {
  const wrapper = document.getElementById("gridjs-wrapper");
  if (wrapper) wrapper.innerHTML = ""; 

  gridInstance = new Grid({
    columns: [
      { name: "Nomor", width: '10%' },
      { name: "Pilihan", width: '50%' },
      { name: "Kategori", width: '15%' },
      { 
        name: "Action",
        width: '25%',
        formatter: (cell, row) => {
          const rawData = JSON.stringify({
            nomor: row.cells[0].data,
            pilihan_teks: row.cells[1].data,
            kategori: row.cells[2].data
          });
          const encoded = btoa(unescape(encodeURIComponent(rawData)));
          
          return html(`
            <div class="btn-group-action d-flex justify-content-center">
              <button class="btn-icon edit" onclick="window.triggerEdit('${encoded}')">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn-icon reset" onclick="window.triggerDelete('${encoded}')">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          `);
        }
      }
    ],
    server: {
      url: '/api/master/manage-question', // Ganti dengan URL getQuestions Anda
      then: data => data.map(q => [q.nomor, q.pilihan_teks, q.kategori]),
    },
    pagination: { limit: 10 },
    search: true,
    sort: true,
  }).render(wrapper);
};

const openModal = (mode, data = null) => {
  if (mode === 'edit') {
    isEditMode.value = true;
    formData.value = { ...data };
    originalKey.value = data.pilihan_teks;
  } else {
    isEditMode.value = false;
    formData.value = { nomor: '', pilihan_teks: '', kategori: '' };
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await axios.put('/api/master/manage-question', {
        ...formData.value,
        original_pilihan_teks: originalKey.value
      });
      Swal.fire('Berhasil', 'Data diperbarui', 'success');
    } else {
      await axios.post('/api/master/manage-question', formData.value);
      Swal.fire('Berhasil', 'Data ditambahkan', 'success');
    }
    showModal.value = false;
    gridInstance.forceRender(); 
  } catch (error) {
    Swal.fire('Error', error.response?.data?.error || 'Terjadi kesalahan', 'error');
  }
};

window.triggerEdit = (encodedData) => {
  const obj = JSON.parse(decodeURIComponent(escape(atob(encodedData))));
  openModal('edit', obj);
};

window.triggerDelete = (encodedData) => {
  const obj = JSON.parse(decodeURIComponent(escape(atob(encodedData))));
  
  Swal.fire({
    title: 'Hapus data?',
    text: `Anda akan menghapus: "${obj.pilihan_teks}"`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e11d48',
    confirmButtonText: 'Ya, Hapus!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/master/manage-question/${encodeURIComponent(obj.pilihan_teks)}`);
        Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
        gridInstance.forceRender();
      } catch (error) {
        Swal.fire('Gagal', 'Gagal menghapus data', 'error');
      }
    }
  });
};

onMounted(initGrid);
</script>

<style scoped>
:deep(.gridjs-container) {
  color: #5a5a7a;
  padding: 0;
}

:deep(.gridjs-wrapper) {
  box-shadow: none;
  border: none;
}

:deep(.gridjs-th) {
  background-color: #f8f9ff !important;
  color: #5a5a7a !important;
  text-transform: none !important;
  padding: 1.2rem !important;
}

:deep(.gridjs-td) {
  padding: 1.2rem !important;
  border-bottom: 1px solid #f0f2ff !important;
}

:deep(.gridjs-search-input) {
  border-radius: 10px;
  border: 1px solid #e8eaff;
}

:deep(.gridjs-td) .btn-group-action {
  gap: 8px;
}

:deep(.btn-icon) {
  width: 38px !important;
  height: 38px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  border-radius: 10px !important;
  border: none !important;
  cursor: pointer;
  background-color: #f0f2ff; 
  transition: all 0.2s;
}

:deep(.btn-icon.edit) {
  color: #4361ee;
  background-color: #f0f2ff !important;
}

:deep(.btn-icon.reset) {
  color: #e11d48;
  background-color: #fff1f2 !important;
}

:deep(.btn-icon i) {
  font-size: 1.1rem;
}

:deep(.gridjs-td) {
  border: none !important;
  border-bottom: 1px solid #f0f2ff !important;
}

.badge-role { padding: 6px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; }
.badge-role.admin { background: #eef2ff; color: #4361ee; }
.badge-role.user { background: #f0fdf4; color: #16a34a; }

.layout-body { display: flex; flex: 1; }
.main-content { flex: 1; padding: 2rem; background-color: #fcfcff; min-height: 100vh; }

.main-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #e8eaff;
}

.table-custom {
  vertical-align: middle;
}
.table-custom thead th {
  background: #f8f9ff;
  border: none;
  color: #5a5a7a;
  font-weight: 600;
  padding: 1.2rem;
}
.table-custom tbody td {
  padding: 1.2rem;
  border-bottom: 1px solid #f0f2ff;
}

.avatar-sm {
  width: 35px;
  height: 35px;
  background: #7d5fff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: bold;
}

.badge-role {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
}
.badge-role.admin { background: #eef2ff; color: #4361ee; }
.badge-role.user { background: #f0fdf4; color: #16a34a; }
.badge-role.editor { background: #fff7ed; color: #ea580c; }

.btn-add {
  background: #7d5fff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  transition: 0.3s;
}
.btn-add:hover { background: #6749e6; transform: translateY(-2px); }

.btn-icon {
  width: 35px;
  height: 35px;
  border-radius: 8px;
  border: none;
  margin: 0 4px;
  transition: 0.2s;
}
.btn-icon.edit { background: #f0f2ff; color: #4361ee; }
.btn-icon.reset { background: #fff1f2; color: #e11d48; }
.btn-icon:hover { transform: scale(1.1); }

.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content-custom {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
}
.btn-primary-custom {
  background: #7d5fff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
}
</style>