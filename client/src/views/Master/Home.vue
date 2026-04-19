<template>
    <div class="home-wrapper">
        <Navbar />

        <div class="layout-body">
        <Sidebar />

        <main class="main-content">
            <div class="container-fluid">
            <div class="main-card">
                <div class="welcome-section text-center">
                <div class="badge-wrapper mb-3">
                    <span class="welcome-badge">Welcome Back!</span>
                </div>
                <h2 class="disc-title">Hello World</h2>
                <p class="disc-subtitle">Selamat datang di dashboard aplikasi Anda.</p>
                
                <hr class="my-4" style="border-color: #f0f2ff;">
                
                <div class="info-card p-4">
                    <p class="mb-0 text-muted">
                    Ini adalah area konten utama. Kamu bisa menambahkan grafik, tabel, atau informasi lainnya di sini 
                    menggunakan layout card yang sudah tersedia.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </main>
        </div>
    </div>
</template>

<script setup>
import Navbar from '../../components/Navbar.vue';
import Sidebar from '../../components/Sidebar.vue';
</script>

<style scoped>
.layout-body {
    display: flex;
    flex: 1;
}

.main-content {
    flex: 1;
    padding: 2rem;
    background-color: #fcfcff;
}

.main-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border: 1px solid #e8eaff;
    animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>