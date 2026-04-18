import { ref } from 'vue'; 
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export function useLogin() {
    const router = useRouter();
    const form = ref({ email: '', password: '' });
    const loading = ref(false);

    const handleLogin = async () => {
        if (!form.value.email || !form.value.password) {
            Swal.fire({
            icon: 'warning',
            title: 'Data Tidak Lengkap',
            text: 'Email dan password wajib diisi!',
            confirmButtonColor: '#0d6efd'
            });
            return;
        }

        loading.value = true;

        Swal.fire({
            title: 'Signing in...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        try {
            const res = await axios.post('/api/auth/login', form.value);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            await Swal.fire({
            icon: 'success',
            title: 'Login Berhasil!',
            text: `Selamat datang, ${res.data.user.name}!`,
            timer: 1500,
            showConfirmButton: false,
            confirmButtonColor: '#0d6efd'
            });

            const userRole = res.data.user.role;
            if (userRole === 'admin') {
            router.push('/admin');
            } else if (userRole === 'hrd') {
            router.push('/hrd');
            } else {
            router.push('/user');
            }
        } catch (err) {
            const statusCode = err.response?.status;
            const message = err.response?.data?.message || 'Terjadi kesalahan sistem';

            if (statusCode === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: 'Email atau password yang Anda masukkan salah.',
                confirmButtonColor: '#dc3545',
                footer: '<a href="/forgot-password" class="small">Lupa password?</a>'
            });
            } 
            else if (statusCode === 400) {
            const errors = err.response?.data?.errors;
            let errorText = message;
            
            if (Array.isArray(errors) && errors.length > 0) {
                errorText = errors.map(e => `• ${e.message}`).join('\n');
            }

            Swal.fire({
                icon: 'warning',
                title: 'Validasi Gagal',
                text: errorText,
                confirmButtonColor: '#ffc107'
            });
            } 
            else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message,
                confirmButtonColor: '#dc3545'
            });
            }
        } finally {
            loading.value = false;
            
            if (Swal.isLoading()) {
            Swal.close();
            }
        }
    };

    return {
        form,
        loading,
        handleLogin
    }
}