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
                <h2 class="disc-title mb-1">Manage Users</h2>
                <p class="text-muted">Kelola data pengguna via Grid.js API.</p>
              </div>
            </div>

            <div id="gridjs-wrapper"></div>
          </div>
        </div>
      </main>
    </div>

    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content-custom">
        <h3>Edit User</h3>
        <div class="form-group mb-3">
          <label>Nama Lengkap</label>
          <input type="text" v-model="selectedUser.name" class="form-control">
        </div>
        <div class="form-group mb-4">
          <label>Role</label>
          <select v-model="selectedUser.role" class="form-select">
            <option value="master">Master</option>
            <option value="user">User</option>
          </select>
        </div>
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-light" @click="showEditModal = false">Batal</button>
          <button class="btn btn-primary-custom" @click="saveUser">Simpan Perubahan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, h, render } from 'vue';
import { Grid, html } from "gridjs";
import Swal from 'sweetalert2';
import axios from 'axios'; 
import Navbar from '../../components/Navbar.vue';
import Sidebar from '../../components/Sidebar.vue';

const showEditModal = ref(false);
const selectedUser = ref({});
let gridInstance = null;

const initGrid = () => {
  gridInstance = new Grid({
    columns: [
      { name: "Name", width: '25%' },
      { name: "Email", width: '30%' },
      { 
        name: "Role", 
        width: '20%',
        formatter: (cell) => html(`<span class="badge-role ${cell.toLowerCase()}">${cell}</span>`)
      },
      { 
        name: "Action",
        width: '25%',
        sort: false,
        formatter: (cell, row) => {
          const userData = btoa(row.cells[3].data); 
          
          return html(`
            <div class="btn-group-action d-flex justify-content-center">
              <button class="btn-icon edit" onclick="window.triggerEdit('${userData}')">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn-icon reset" onclick="window.triggerReset('${userData}')">
                <i class="bi bi-shield-lock"></i>
              </button>
            </div>
          `);
        }
      }
    ],
    server: {
      url: '/api/master/manage-user',
      then: data => data.map(user => [
        user.name, 
        user.email, 
        user.role, 
        JSON.stringify(user)
      ]),
    },
  }).render(document.getElementById("gridjs-wrapper"));
};

window.triggerEdit = (encodedData) => {
  const userObj = JSON.parse(atob(encodedData)); 
  selectedUser.value = userObj;
  showEditModal.value = true;
};

window.triggerReset = (encodedData) => {
  const userObj = JSON.parse(atob(encodedData)); 
  resetPassword(userObj);
};

const saveUser = async () => {
    if (!selectedUser.value.id) return;

    try {
        Swal.showLoading();

        await axios.put(`/api/master/update-user/${selectedUser.value.id}`, {
            name: selectedUser.value.name,
            role: selectedUser.value.role
        });

        await Swal.fire({
            title: 'Berhasil!',
            text: 'Data user telah diperbarui.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });

        showEditModal.value = false;
        gridInstance.forceRender(); 
    } catch (e) {
        console.error(e);
        Swal.fire('Error', 'Gagal memperbarui data user.', 'error');
    }
};

const resetPassword = async (user) => {
    const result = await Swal.fire({
        title: 'Reset Password?',
        text: `Password untuk ${user.name} akan dikembalikan menjadi: 12345678`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7d5fff',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Ya, Reset Sekarang!',
        cancelButtonText: 'Batal',
        reverseButtons: true
    });

    if (result.isConfirmed) {
        try {
            Swal.fire({ title: 'Processing...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

            await axios.post(`/api/master/reset-password/${user.id}`);

            await Swal.fire({
                title: 'Password Ter-reset!',
                text: 'Password berhasil dikembalikan ke default (12345678).',
                icon: 'success'
            });
            
        } catch (e) {
            console.error(e);
            Swal.fire('Gagal!', 'Terjadi kesalahan saat mereset password.', 'error');
        }
    }
};

onMounted(() => {
  initGrid();
});
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