import { ref } from 'vue'; 
import axios from 'axios'; 
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export function useRegister() {
    const router = useRouter();
    const loading = ref(false); 
    const form = ref({
        name: '',
        email: '',
        password: ''
    });

    const handleRegister = async () => {
        if (!form.value.name || !form.value.email || !form.value.password) {
            Swal.fire({
            icon: 'warning',
            title: 'Data Tidak Lengkap',
            text: 'Semua field wajib diisi!',
            confirmButtonColor: '#198754'
            });
            return;
        }

        loading.value = true;

        Swal.fire({
            title: 'Mendaftar...',
            text: 'Mohon tunggu sebentar',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });
        
        try {
            await axios.post('/api/auth/register', form.value);
            
            await Swal.fire({
            icon: 'success',
            title: 'Registrasi Berhasil! 🎉',
            text: 'Silakan login dengan akun Anda.',
            confirmButtonColor: '#198754',
            timer: 2000,
            showConfirmButton: false
            });

            router.push('/login');
        } catch (err) {
            const statusCode = err.response?.status;
            const message = err.response?.data?.message || 'Gagal melakukan registrasi';
            const errors = err.response?.data?.errors; 
            
            loading.value = false;

            if (message.toLowerCase().includes('email') && message.toLowerCase().includes('terdaftar')) {
            Swal.fire({
                icon: 'error',
                title: 'Email Sudah Digunakan',
                text: 'Email ini sudah terdaftar. Silakan login atau gunakan email lain.',
                confirmButtonColor: '#dc3545',
                footer: '<a href="/login" class="small">Sudah punya akun? Login di sini</a>'
            });
            } 
            else if (statusCode === 400 && Array.isArray(errors) && errors.length > 0) {
            const errorList = errors.map(e => `• ${e.message}`).join('\n');
            Swal.fire({
                icon: 'warning',
                title: 'Validasi Gagal',
                text: errorList,
                confirmButtonColor: '#ffc107',
                footer: 'Periksa kembali input Anda'
            });
            } 
            else {
            Swal.fire({
                icon: 'error',
                title: 'Registrasi Gagal',
                text: message,
                confirmButtonColor: '#dc3545'
            });
            }
        } finally {
            if (Swal.isLoading()) {
            Swal.close();
            }
        }
    };

    return {
        form,
        loading,
        handleRegister
    };
}