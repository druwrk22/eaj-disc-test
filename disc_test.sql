-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table eaj_disc.disc_master
CREATE TABLE IF NOT EXISTS `disc_master` (
  `nomor` int NOT NULL,
  `pilihan_teks` varchar(255) NOT NULL,
  `kategori` char(1) DEFAULT NULL,
  PRIMARY KEY (`nomor`,`pilihan_teks`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table eaj_disc.disc_master: ~96 rows (approximately)
INSERT INTO `disc_master` (`nomor`, `pilihan_teks`, `kategori`) VALUES
	(1, 'Ingin kesempatan baru', 'D'),
	(1, 'Ingin otoritas lebih', 'I'),
	(1, 'Ingin petunjuk yang jelas', 'C'),
	(1, 'Menghindari konflik', 'S'),
	(2, 'Dibuat menyenangkan', 'S'),
	(2, 'Hasil adalah penting', 'D'),
	(2, 'Lakukan dengan benar, Akurasi penting', 'C'),
	(2, 'Mari kerjakan bersama', 'I'),
	(3, 'Cenderung janji berlebihan', 'I'),
	(3, 'Tarik diri di tengah tekanan', 'C'),
	(3, 'Tidak takut bertempur', 'D'),
	(3, 'Tolak perubahan mendadak', 'S'),
	(4, 'Gerak cepat, Tekun', 'D'),
	(4, 'Hidup, Suka bicara', 'I'),
	(4, 'Usaha mengikuti aturan', 'C'),
	(4, 'Usaha menjaga keseimbangan', 'S'),
	(5, 'Aktif mengubah sesuatu', 'D'),
	(5, 'Ingin hal-hal yang pasti', 'S'),
	(5, 'Ramah, Mudah bergabung', 'I'),
	(5, 'Unik, Bosan rutinitas', 'C'),
	(6, 'Dapat diandalkan, Dapat dipercaya', 'S'),
	(6, 'Garis dasar, Orientasi hasil', 'D'),
	(6, 'Jalankan standar yang tinggi, Akurat', 'C'),
	(6, 'Kreatif, Unik', 'I'),
	(7, 'Akan berjalan terus tanpa kontrol diri', 'C'),
	(7, 'Akan membeli sesuai dorongan hati', 'I'),
	(7, 'Akan mengusahakan yang kuinginkan', 'D'),
	(7, 'Akan menunggu, Tanpa tekanan', 'S'),
	(8, 'Dapat diramal, Konsisten', 'S'),
	(8, 'Memimpin, Pendekatan langsung', 'D'),
	(8, 'Suka bergaul, Antusias', 'I'),
	(8, 'Waspada, Hati-hati', 'C'),
	(9, 'Bagian dari kelompok', 'S'),
	(9, 'Berusaha sempurna', 'C'),
	(9, 'Ingin membuat tujuan', 'D'),
	(9, 'Menyemangati orang', 'I'),
	(10, 'Aturan membuat adil', 'C'),
	(10, 'Aturan membuat aman', 'S'),
	(10, 'Aturan membuat bosan', 'I'),
	(10, 'Aturan perlu dipertanyakan', 'D'),
	(11, 'Dipenuhi hal detail', 'C'),
	(11, 'Menuntut, Kasar', 'I'),
	(11, 'Non-konfrontasi, Menyerah', 'S'),
	(11, 'Perubahan pada menit terakhir', 'D'),
	(12, 'Bepergian demi petualangan baru', 'I'),
	(12, 'Menerima ganjaran atas tujuan yg dicapai', 'D'),
	(12, 'Menggunakan waktu berkualitas dgn teman', 'S'),
	(12, 'Rencanakan masa depan, Bersiap', 'C'),
	(13, 'Kompetitif, Suka tantangan', 'D'),
	(13, 'Memikirkan orang dahulu', 'S'),
	(13, 'Optimis, Positif', 'I'),
	(13, 'Pemikir logis, Sistematik', 'C'),
	(14, 'Keselamatan, keamanan', 'S'),
	(14, 'Pendidikan, Kebudayaan', 'C'),
	(14, 'Prestasi, Ganjaran', 'D'),
	(14, 'Sosial, Perkumpulan kelompok', 'I'),
	(15, 'Ingin kemajuan', 'D'),
	(15, 'Puas dengan segalanya', 'C'),
	(15, 'Rendah hati, Sederhana', 'S'),
	(15, 'Terbuka memperlihatkan perasaan', 'I'),
	(16, 'Lembut suara, Pendiam', 'C'),
	(16, 'Optimistik, Visioner', 'I'),
	(16, 'Pendamai, Membawa Harmoni', 'S'),
	(16, 'Pusat Perhatian, Suka gaul', 'D'),
	(17, 'Bahagia, Tanpa beban', 'C'),
	(17, 'Menyenangkan, Baik hati', 'I'),
	(17, 'Tak gentar, Berani', 'D'),
	(17, 'Tenang, Pendiam', 'S'),
	(18, 'Delegator yang baik', 'D'),
	(18, 'Pendengar yang baik', 'S'),
	(18, 'Penganalisa yang baik', 'C'),
	(18, 'Penyemangat yang baik', 'I'),
	(19, 'Kelola waktu secara efisien', 'D'),
	(19, 'Masalah sosial itu penting', 'I'),
	(19, 'Sering terburu-buru, Merasa tertekan', 'S'),
	(19, 'Suka selesaikan apa yang saya mulai', 'C'),
	(20, 'Berani, Tak gentar', 'D'),
	(20, 'Menyenangkan orang, Mudah setuju', 'S'),
	(20, 'Tenang, Pendiam', 'C'),
	(20, 'Tertawa lepas, Hidup', 'I'),
	(21, 'Ingin segalanya teratur, Rapi', 'C'),
	(21, 'Kerjakan sesuai perintah, Ikut pimpinan', 'S'),
	(21, 'Mudah terangsang, Riang', 'I'),
	(21, 'Tidak mudah dikalahkan', 'D'),
	(22, 'Saya akan melaksanakan', 'S'),
	(22, 'Saya akan meyakinkan mereka', 'I'),
	(22, 'Saya akan pimpin mereka', 'D'),
	(22, 'Saya dapatkan fakta', 'C'),
	(23, 'Menceritakan sisi saya', 'I'),
	(23, 'Menjadi frustrasi', 'D'),
	(23, 'Menyimpan perasaan saya', 'S'),
	(23, 'Siap beroposisi', 'C'),
	(24, 'Gampangan, Mudah setuju', 'I'),
	(24, 'Percaya, Mudah percaya pada orang', 'D'),
	(24, 'Petualang, Mengambil resiko', 'C'),
	(24, 'Toleran, Menghormati', 'S');

-- Dumping structure for table eaj_disc.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table eaj_disc.sequelizemeta: ~2 rows (approximately)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20260416200836-create-disc-master.js'),
	('20260416201325-create-user-responses.js'),
	('20260416210037-create-users.js'),
	('20260418144907-add-user-id-to-user-responses.js');

-- Dumping structure for table eaj_disc.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('master','hrd','user') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table eaj_disc.users: ~5 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin Master', 'master@mail.com', '$2b$10$YQHD37BoNM.y8TqO02HTCeL2Ao9WqHlqGggmI3wYalrhamp2baB56', 'master', '2026-04-16 22:36:10', '2026-04-16 22:36:10'),
	(2, 'a', 'a@gmail.com', '$2b$10$SHZIM2zuIb/tnbIqJxcV0.4IZcwhfqUYxeLq/QW9oktdttl5Ym0sW', 'user', '2026-04-16 22:55:06', '2026-04-16 22:55:06'),
	(3, 'andaru', 'andarutr@gmail.com', '$2b$10$Tl9Jlb4jqbXhENDMG4hoaOL10jbbvFS6GDRqrnWi/AJP8kWD.bkwK', 'user', '2026-04-17 06:28:17', '2026-04-17 06:28:17'),
	(4, 'daru', 'druwrk22@gmail.com', '$2b$10$4JbpC63HxFCljdmpLeNNS.PQOgRedrS1WqfAmHzpJS3uMElBFAh1m', 'user', '2026-04-18 12:57:57', '2026-04-18 12:57:57'),
	(5, 'Triyadi', 'yadi@gmail.com', '$2b$10$xXaD3DOOl6zGTJ7ZKhyJgeoJ8UeIglwzs7Ss3O/ry1ikxmVKICNpq', 'user', '2026-04-18 14:29:48', '2026-04-18 14:29:48');

-- Dumping structure for table eaj_disc.user_responses
CREATE TABLE IF NOT EXISTS `user_responses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `nomor` int DEFAULT NULL,
  `pilihan_paling` varchar(255) DEFAULT NULL,
  `pilihan_kurang` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_user_nomor` (`user_id`,`nomor`),
  KEY `idx_user_responses_user_id` (`user_id`),
  CONSTRAINT `user_responses_user_id_foreign_idx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table eaj_disc.user_responses: ~21 rows (approximately)
INSERT INTO `user_responses` (`id`, `user_id`, `nomor`, `pilihan_paling`, `pilihan_kurang`) VALUES
	(6, 4, 1, 'Menghindari konflik', 'Ingin petunjuk yang jelas'),
	(7, 4, 2, 'Dibuat menyenangkan', 'Hasil adalah penting'),
	(8, 4, 3, 'Tolak perubahan mendadak', 'Tidak takut bertempur'),
	(9, 4, 4, 'Gerak cepat, Tekun', 'Hidup, Suka bicara'),
	(10, 4, 5, 'Ingin hal-hal yang pasti', 'Aktif mengubah sesuatu'),
	(11, 4, 6, 'Dapat diandalkan, Dapat dipercaya', 'Garis dasar, Orientasi hasil'),
	(12, 4, 7, 'Akan berjalan terus tanpa kontrol diri', 'Akan membeli sesuai dorongan hati'),
	(13, 4, 8, 'Suka bergaul, Antusias', 'Memimpin, Pendekatan langsung'),
	(14, 4, 9, 'Menyemangati orang', 'Ingin membuat tujuan'),
	(15, 4, 10, 'Aturan perlu dipertanyakan', 'Aturan membuat bosan'),
	(16, 4, 11, 'Perubahan pada menit terakhir', 'Non-konfrontasi, Menyerah'),
	(17, 4, 12, 'Menggunakan waktu berkualitas dgn teman', 'Rencanakan masa depan, Bersiap'),
	(18, 4, 13, 'Kompetitif, Suka tantangan', 'Pemikir logis, Sistematik'),
	(19, 4, 14, 'Prestasi, Ganjaran', 'Pendidikan, Kebudayaan'),
	(20, 4, 15, 'Ingin kemajuan', 'Puas dengan segalanya'),
	(21, 4, 16, 'Lembut suara, Pendiam', 'Optimistik, Visioner'),
	(22, 4, 17, 'Bahagia, Tanpa beban', 'Menyenangkan, Baik hati'),
	(23, 4, 18, 'Delegator yang baik', 'Pendengar yang baik'),
	(24, 4, 19, 'Masalah sosial itu penting', 'Sering terburu-buru, Merasa tertekan'),
	(25, 4, 20, 'Berani, Tak gentar', 'Tertawa lepas, Hidup'),
	(26, 4, 21, 'Ingin segalanya teratur, Rapi', 'Kerjakan sesuai perintah, Ikut pimpinan'),
	(27, 4, 22, 'Saya akan melaksanakan', 'Saya akan pimpin mereka'),
	(28, 4, 23, 'Menceritakan sisi saya', 'Siap beroposisi'),
	(29, 4, 24, 'Gampangan, Mudah setuju', 'Percaya, Mudah percaya pada orang');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
