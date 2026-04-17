import { ref } from 'vue';
import axios from 'axios';

const user = ref(JSON.parse(localStorage.getItem('user')) || null);
const token = ref(localStorage.getItem('token') || null);

export default function useAuth() {
    const login = async (credentials) => {
        const res = await axios.post('http://localhost:3000/api/auth/login', credentials);
        token.value = res.data.token;
        user.value = res.data.user;
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data;
    };

    const logout = () => {
        token.value = null;
        user.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return { user, token, login, logout };
}