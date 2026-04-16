'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      // No 1
      { nomor: 1, pilihan_teks: 'Menghindari konflik', kategori: 'S' },
      { nomor: 1, pilihan_teks: 'Ingin petunjuk yang jelas', kategori: 'C' },
      { nomor: 1, pilihan_teks: 'Ingin kesempatan baru', kategori: 'D' },
      { nomor: 1, pilihan_teks: 'Ingin otoritas lebih', kategori: 'I' },
      // No 2
      { nomor: 2, pilihan_teks: 'Mari kerjakan bersama', kategori: 'I' },
      { nomor: 2, pilihan_teks: 'Hasil adalah penting', kategori: 'D' },
      { nomor: 2, pilihan_teks: 'Lakukan dengan benar, Akurasi penting', kategori: 'C' },
      { nomor: 2, pilihan_teks: 'Dibuat menyenangkan', kategori: 'S' },
      // No 3
      { nomor: 3, pilihan_teks: 'Cenderung janji berlebihan', kategori: 'I' },
      { nomor: 3, pilihan_teks: 'Tolak perubahan mendadak', kategori: 'S' },
      { nomor: 3, pilihan_teks: 'Tarik diri di tengah tekanan', kategori: 'C' },
      { nomor: 3, pilihan_teks: 'Tidak takut bertempur', kategori: 'D' },
      // No 4
      { nomor: 4, pilihan_teks: 'Gerak cepat, Tekun', kategori: 'D' },
      { nomor: 4, pilihan_teks: 'Usaha menjaga keseimbangan', kategori: 'S' },
      { nomor: 4, pilihan_teks: 'Hidup, Suka bicara', kategori: 'I' },
      { nomor: 4, pilihan_teks: 'Usaha mengikuti aturan', kategori: 'C' },
      // No 5
      { nomor: 5, pilihan_teks: 'Aktif mengubah sesuatu', kategori: 'D' },
      { nomor: 5, pilihan_teks: 'Ramah, Mudah bergabung', kategori: 'I' },
      { nomor: 5, pilihan_teks: 'Unik, Bosan rutinitas', kategori: 'C' },
      { nomor: 5, pilihan_teks: 'Ingin hal-hal yang pasti', kategori: 'S' },
      // No 6
      { nomor: 6, pilihan_teks: 'Jalankan standar yang tinggi, Akurat', kategori: 'C' },
      { nomor: 6, pilihan_teks: 'Garis dasar, Orientasi hasil', kategori: 'D' },
      { nomor: 6, pilihan_teks: 'Dapat diandalkan, Dapat dipercaya', kategori: 'S' },
      { nomor: 6, pilihan_teks: 'Kreatif, Unik', kategori: 'I' },
      // No 7
      { nomor: 7, pilihan_teks: 'Akan menunggu, Tanpa tekanan', kategori: 'S' },
      { nomor: 7, pilihan_teks: 'Akan membeli sesuai dorongan hati', kategori: 'I' },
      { nomor: 7, pilihan_teks: 'Akan mengusahakan yang kuinginkan', kategori: 'D' },
      { nomor: 7, pilihan_teks: 'Akan berjalan terus tanpa kontrol diri', kategori: 'C' },
      // No 8
      { nomor: 8, pilihan_teks: 'Memimpin, Pendekatan langsung', kategori: 'D' },
      { nomor: 8, pilihan_teks: 'Waspada, Hati-hati', kategori: 'C' },
      { nomor: 8, pilihan_teks: 'Suka bergaul, Antusias', kategori: 'I' },
      { nomor: 8, pilihan_teks: 'Dapat diramal, Konsisten', kategori: 'S' },
      // No 9
      { nomor: 9, pilihan_teks: 'Ingin membuat tujuan', kategori: 'D' },
      { nomor: 9, pilihan_teks: 'Bagian dari kelompok', kategori: 'S' },
      { nomor: 9, pilihan_teks: 'Berusaha sempurna', kategori: 'C' },
      { nomor: 9, pilihan_teks: 'Menyemangati orang', kategori: 'I' },
      // No 10
      { nomor: 10, pilihan_teks: 'Aturan perlu dipertanyakan', kategori: 'D' },
      { nomor: 10, pilihan_teks: 'Aturan membuat adil', kategori: 'C' },
      { nomor: 10, pilihan_teks: 'Aturan membuat bosan', kategori: 'I' },
      { nomor: 10, pilihan_teks: 'Aturan membuat aman', kategori: 'S' },
      // No 11
      { nomor: 11, pilihan_teks: 'Perubahan pada menit terakhir', kategori: 'D' },
      { nomor: 11, pilihan_teks: 'Non-konfrontasi, Menyerah', kategori: 'S' },
      { nomor: 11, pilihan_teks: 'Dipenuhi hal detail', kategori: 'C' },
      { nomor: 11, pilihan_teks: 'Menuntut, Kasar', kategori: 'I' },
      // No 12
      { nomor: 12, pilihan_teks: 'Rencanakan masa depan, Bersiap', kategori: 'C' },
      { nomor: 12, pilihan_teks: 'Menerima ganjaran atas tujuan yg dicapai', kategori: 'D' },
      { nomor: 12, pilihan_teks: 'Bepergian demi petualangan baru', kategori: 'I' },
      { nomor: 12, pilihan_teks: 'Menggunakan waktu berkualitas dgn teman', kategori: 'S' },
      // No 13
      { nomor: 13, pilihan_teks: 'Pemikir logis, Sistematik', kategori: 'C' },
      { nomor: 13, pilihan_teks: 'Memikirkan orang dahulu', kategori: 'S' },
      { nomor: 13, pilihan_teks: 'Kompetitif, Suka tantangan', kategori: 'D' },
      { nomor: 13, pilihan_teks: 'Optimis, Positif', kategori: 'I' },
      // No 14
      { nomor: 14, pilihan_teks: 'Pendidikan, Kebudayaan', kategori: 'C' },
      { nomor: 14, pilihan_teks: 'Keselamatan, keamanan', kategori: 'S' },
      { nomor: 14, pilihan_teks: 'Prestasi, Ganjaran', kategori: 'D' },
      { nomor: 14, pilihan_teks: 'Sosial, Perkumpulan kelompok', kategori: 'I' },
      // No 15
      { nomor: 15, pilihan_teks: 'Ingin kemajuan', kategori: 'D' },
      { nomor: 15, pilihan_teks: 'Rendah hati, Sederhana', kategori: 'S' },
      { nomor: 15, pilihan_teks: 'Terbuka memperlihatkan perasaan', kategori: 'I' },
      { nomor: 15, pilihan_teks: 'Puas dengan segalanya', kategori: 'C' },
      // No 16
      { nomor: 16, pilihan_teks: 'Pendamai, Membawa Harmoni', kategori: 'S' },
      { nomor: 16, pilihan_teks: 'Optimistik, Visioner', kategori: 'I' },
      { nomor: 16, pilihan_teks: 'Pusat Perhatian, Suka gaul', kategori: 'D' },
      { nomor: 16, pilihan_teks: 'Lembut suara, Pendiam', kategori: 'C' },
      // No 17
      { nomor: 17, pilihan_teks: 'Tenang, Pendiam', kategori: 'S' },
      { nomor: 17, pilihan_teks: 'Menyenangkan, Baik hati', kategori: 'I' },
      { nomor: 17, pilihan_teks: 'Bahagia, Tanpa beban', kategori: 'C' },
      { nomor: 17, pilihan_teks: 'Tak gentar, Berani', kategori: 'D' },
      // No 18
      { nomor: 18, pilihan_teks: 'Delegator yang baik', kategori: 'D' },
      { nomor: 18, pilihan_teks: 'Pendengar yang baik', kategori: 'S' },
      { nomor: 18, pilihan_teks: 'Penyemangat yang baik', kategori: 'I' },
      { nomor: 18, pilihan_teks: 'Penganalisa yang baik', kategori: 'C' },
      // No 19
      { nomor: 19, pilihan_teks: 'Masalah sosial itu penting', kategori: 'I' },
      { nomor: 19, pilihan_teks: 'Kelola waktu secara efisien', kategori: 'D' },
      { nomor: 19, pilihan_teks: 'Suka selesaikan apa yang saya mulai', kategori: 'C' },
      { nomor: 19, pilihan_teks: 'Sering terburu-buru, Merasa tertekan', kategori: 'S' },
      // No 20
      { nomor: 20, pilihan_teks: 'Menyenangkan orang, Mudah setuju', kategori: 'S' },
      { nomor: 20, pilihan_teks: 'Berani, Tak gentar', kategori: 'D' },
      { nomor: 20, pilihan_teks: 'Tenang, Pendiam', kategori: 'C' },
      { nomor: 20, pilihan_teks: 'Tertawa lepas, Hidup', kategori: 'I' },
      // No 21
      { nomor: 21, pilihan_teks: 'Kerjakan sesuai perintah, Ikut pimpinan', kategori: 'S' },
      { nomor: 21, pilihan_teks: 'Tidak mudah dikalahkan', kategori: 'D' },
      { nomor: 21, pilihan_teks: 'Mudah terangsang, Riang', kategori: 'I' },
      { nomor: 21, pilihan_teks: 'Ingin segalanya teratur, Rapi', kategori: 'C' },
      // No 22
      { nomor: 22, pilihan_teks: 'Saya dapatkan fakta', kategori: 'C' },
      { nomor: 22, pilihan_teks: 'Saya akan meyakinkan mereka', kategori: 'I' },
      { nomor: 22, pilihan_teks: 'Saya akan pimpin mereka', kategori: 'D' },
      { nomor: 22, pilihan_teks: 'Saya akan melaksanakan', kategori: 'S' },
      // No 23
      { nomor: 23, pilihan_teks: 'Menjadi frustrasi', kategori: 'D' },
      { nomor: 23, pilihan_teks: 'Siap beroposisi', kategori: 'C' },
      { nomor: 23, pilihan_teks: 'Menyimpan perasaan saya', kategori: 'S' },
      { nomor: 23, pilihan_teks: 'Menceritakan sisi saya', kategori: 'I' },
      // No 24
      { nomor: 24, pilihan_teks: 'Toleran, Menghormati', kategori: 'S' },
      { nomor: 24, pilihan_teks: 'Gampangan, Mudah setuju', kategori: 'I' },
      { nomor: 24, pilihan_teks: 'Percaya, Mudah percaya pada orang', kategori: 'D' },
      { nomor: 24, pilihan_teks: 'Petualang, Mengambil resiko', kategori: 'C' }
    ];

    await queryInterface.bulkInsert('disc_master', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('disc_master', null, {});
  }
};
