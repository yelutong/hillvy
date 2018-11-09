'use strict';

const question = [
	{
		IndonesianName:'Akun',
		EnglishName:'Account',
		IndonesianQuestion:[
			{
				title:'Mengapa saya tidak menerima SMS Kode Verifikasi',
				description:'Setiap nomor telepon hanya dapat meminta SMS Kode Verifikasi sebanyak 5 kali dalam sehari. Jika terjadi masalah jaringan pada nomor Anda, mohon untuk tidak melakukan permintaan berulang kali dan coba lagi beberapa saat kemudian.'
			},
			{
				title:'Bagaimana jika saya lupa sandi pola gambar untuk masuk ke akun saya',
				description:'Silahkan klik “Lupa Sandi” pada layar dan Anda akan masuk melalui kode verifikasi SMS. Setelah berhasil masuk ke akun Anda, silahkan menggambar kembali sandi pola gambar yang baru.'
			},
			{
				title:'Pada layar masuk aplikasi terdapat peringatan bahwa saya sudah masuk (login) di perangkat lain, apa yang harus saya lakukan',
				description:'Silahkan dipastikan kembali bahwa akun tersebut adalah milik Anda sendiri dan pastikan akun Anda tidak dalam keadaan masuk (login) di perangkat lainnya. Jika bukan Anda yang sedang masuk di perangkat lainnya, Anda disarankan untuk klik “Lupa Sandi” dan mengatur ulang sandi yang baru.'
			},
			{
				title:'Bagaimana cara keluar (logout) dari akun',
				description:'Silahkan mengikuti langkah berikut untuk keluar dari akun Anda'
			},
			{
				title:'Apakah terdapat risiko kebocoran data yang disampaikan kepada Pinjam Gampang',
				description:'Pinjam Gampang selalu berusaha melindungi informasi Anda, termasuk keamanan informasi berbentuk fisik, elektronik, termasuk namun tidak terbatas pada SSL, penyimpanan enskripsi informasi, pengendalian akses pusat data. Kami sedang dalam tahap penilaian dan penerapan standar internasional organisasi (ISO) 27001 tentang keamanan data.'
			},
			{
				title:'Bagaiman cara mengganti nomor HP dan informasi identitas lainnya',
				description:'Silahkan hubungi layanan customer service kami untuk melakukan perubahan nomor telepon dan informasi identitas lainnya.||| Kedepannya, Pinjam Gampang akan menambahkan fungsi penggantian nomor telepon untuk memudahkan Anda.'
			},
		]
	},
	{
		IndonesianName:'Pengisian Pengajuan',
		EnglishName:'Applicaton',
		IndonesianQuestion:[
			{
				title:'Bagaimana cara mengajukan pinjaman di Pinjam Gampang',
				description:'1. Register/Login aplikasi Pinjam Gampang ||| 2. Pilih jumlah dan jangka waktu pinjaman yang diinginkan ||| 3. Melakukan verifikasi wajah dan mengisi identitas dasar seperti identitas diri dan informasi pekerjaan ||| 4. Jika Anda lolos verifikasi, Anda akan diberikan detail informasi jumlah pinjaman yang disetujui berserta rincian bunga dan biaya. Apabila Anda setuju, pinjaman Anda akan diproses dalam waktu 24 jam untuk dikirimkan ke rekening bank Anda'
			},
			{
				title:'Berapa hari diperlukan untuk proses verifikasi',
				description:'Proses verifikasi diperkirakan 1 (satu) hingga 5 (hari) kerja. Selama menunggu, dipastikan bahwa nomor telepon Anda adalah aktif agar dapat dihubungi untuk konfirmasi dari pihak kami.'
			},
			{
				title:'Apakah saya dapat melakukan pembatalan permohonan pinjaman selama proses verifikasi',
				description:'Hingga saat ini, Pinjam Gampang belum mendukung adanya pembatalan permohonan pinjaman. Jika terdapat kesalahan informasi/kekurangan informasi, Anda diperkenankan untuk mengubah informasi dan melakukan pengajuan kembali setelah pengajuan sebelumnya ditolak.'
			},
			{
				title:'Apakah saya akan dihubungi Pinjam Gampang selama proses verifikasi',
				description:'Untuk memastikan kebenaran informasi yang telah diajukan, Pinjam Gampang akan menghubungi Anda atau tempat Anda bekerja melalui telepon berdasarkan nomor telpon yang telah Anda sampaikan melalui applikasi dan berdasarkan kebutuhan verifikasi yang diperlukan.'
			},
			{
				title:'Berapa hari diperlukan untuk pencairan pinjaman',
				description:'Setelah lolos proses verifikasi, dibutuhkan waktu 1 (satu) hingga 3 (tiga) hari kerja untuk proses pencairan dana. Jika Anda masih belum menerima pencairan pinjaman Anda, silahkan hubungi layanan customer service kami di (021) 3003 3358.'
			}
		]
	},
	{
		IndonesianName:'Produk Pinjaman',
		EnglishName:'Loan',
		IndonesianQuestion:[
			{
				title:'Apa itu Pinjam Gampang',
				description:'Pinjam Gampang merupakan sebuah aplikasi Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi yang telah terdaftar dan diawasi oleh OJK sejak tanggal 13 April 2018 dengan tanda terdaftar S-272/NB.213/2018.'
			},
			{
				title:'Apa syarat pengajuan pinjaman melalui Pinjam Gampang',
				description:'a. Warga Negara Indonesia ||| b. Berusia 21 tahun atau lebih. ||| c. Memiliki Kartu Tanda Penduduk ||| d. Telah bekerja, memiliki penghasilan stabil, dan memiliki kartu identitas perusahaan |||e. Memiliki rekening bank atas nama sendiri ||| f. Berdomisili di Jabodetabek, Bandung, Surabaya, Manado, Semarang, Sidoarjo, Batam, Padang, Denpasar, Yogyakarta, Gresik, Malang, Bontang, Makassar, Palembang, Kediri'
			},
			{
				title:'Berapa jumlah pinjaman dan tenor yang dapat saya ajukan',
				description:'Jumlah pinjaman yang tersedia di Pinjam Gampang mulai dari Rp600.000 sampai dengan Rp5.000.000 dengan pilihan tenor 7 hari atau 14 hari.'
			},
			{
				title:'Kota mana saja yang termasuk dalam area jangkauan Pinjam Gampang',
				description:'Hingga saat ini, Pinjam Gampang telah tersedia di 20 (dua puluh) wilayah berikut – Jabodetabek, Bandung, Surabaya, Manado, Semarang, Sidoarjo, Batam, Padang, Denpasar, Yogyakarta, Gresik, Malang, Bontang, Makassar, Palembang, Kediri.||| Cek website www.kreditplusteknologi.id dan akun sosial media (Facebook, Instagram, LinkedIn) untuk perkembangan lebih lanjut !'
			},
			{
				title:'Apakah jumlah pinjaman yang saya ajukan merupakan jumlah yang akan saya terima',
				description:'Jumlah yang telah diajukan oleh Anda akan diverifikasi dan dipertimbangkan oleh sistem Pinjam Gampang.||| Sistem Pinjam Gampang kemudian akan menampilkan dan menawarkan jumlah pinjaman yang disetujui dan jumlah nominal yang akan diterima oleh Anda. Penawaran ini akan berlaku selama 7 (tujuh) hari. ||| Anda dapat memberikan konfirmasi penerimaan penawaran dengan klik “Pinjam Sekarang” pada layar aplikasi dan pinjaman Anda akan dikirimkan ke rekening bank Anda.|||Jika tidak, maka akan dianggap Anda melepaskan kesempatan permohonan pinjaman Anda.'
			},
			{
				title:'Bagaimana cara sistem Pinjam Gampang melakukan pertimbangan terhadap jumlah pinjaman yang akan saya terima',
				description:'Sistem Pinjam Gampang menggunakan teknologi keamanan dan Big Data untuk mempertimbangkan skor kredit Anda mulai dari berbagai aspek, seperti pendidikan, pekerjaan, penghasilan, dan sebagainya.'
			},
			{
				title:'Apa persyaratan kartu akun bank yang saya gunakan untuk menerima pencairan pinjaman',
				description:'Kartu akun bank yang digunakan harus merupakan kartu akun bank milik pribadi peminjam, dan memastikan bahwa kartu akun bank dapat beroperasi secara normal, tidak ada pengecualian seperti kartu bank yang di blokir ataupun keadaan pengecualian umum lainnya.'
			},
			{
				title:'Bank mana saja yang dapat digunakan untuk pengiriman dana pinjaman',
				description:'Pinjam Gampang telah bekerjasama dengan beberapa bank berikut untuk proses pengiriman dana pinjaman – Bank Mandiri, BCA, BNI, BRI, BTN, CIMB, Bank Permata, Bank Panin, Bank Danamon Indonesia. '
			},
			{
				title:'Bagaimana cara menghubungi Pinjam Gampang',
				description:'Anda dapat menghubungi customer service kami pada nomor (021) 3003 3358.||| Jam operasional : Senin – Jumat antara jam 09.00 – 12.00 dan jam 13.00 – 17.00. ||| Atau melalui email ke kpt@kreditplusteknologi.id'
			}
		]
	},
	{
		IndonesianName:'Pelunasan',
		EnglishName:'Repayment',
		IndonesianQuestion:[
			{
				title:'Bagaimana cara melakukan pelunasan pinjaman',
				description:'Sebelum tanggal jatuh tempo, Pinjam Gampang akan mengirimkan SMS untuk mengingatkan Anda tentang tanggal jatuh tempo dan jumlah pinjaman Anda.|||Anda dapat melakukan pelunasan melalui metode transfer dari mesin ATM, mobile banking, internet banking, atau melalui mini-market seperti Alfamart/AlfaMidi/Alfa Express/Lawson/DAN+DAN.|||Jika Anda sudah melakukan pelunasan, Pinjam Gampang akan secara otomatis menerima pelunasan dan mengubah status pinjaman Anda menjadi lunas.'
			},
			{
				title:'Apa akibatnya jika saya melakukan pembayaran setelah tanggal jatuh tempo',
				description:'Setiap keterlambatan pelunasan akan dikenakan biaya keterlambatan dimana perincian biaya keterlambatan tertera di dalam aplikasi dan informasi lebih lanjut silahkan baca di "Perjanjian Pinjaman"'
			},
			{
				title:'Sudah melakukan pembayaran pinjaman, mengapa masih menerima SMS penagihan',
				description:'Sistem akan melakukan pembaruan halaman setelah Anda berhasil melakukan pembayaran pinjaman, sebelum pembaruan halaman dan sistem terjadi, SMS masih dapat terkirim. Mohon abaikan SMS penagihan jika Anda telah berhasil melakukan pembayaran pinjaman.'
			}
		]
	},
	{
		IndonesianName:'FAQ',
		EnglishName:'FAQ',
		IndonesianQuestion:[
			{
				title:'Apa syarat pengajuan pinjaman melalui Pinjam Gampang',
				description:'a. Warga Negara Indonesia ||| b. Berusia 21 tahun atau lebih. ||| c. Memiliki Kartu Tanda Penduduk ||| d. Telah bekerja, memiliki penghasilan stabil, dan memiliki kartu identitas perusahaan |||e. Memiliki rekening bank atas nama sendiri ||| f. Berdomisili di Jabodetabek, Bandung, Surabaya, Manado, Semarang, Sidoarjo, Batam, Padang, Denpasar, Yogyakarta, Gresik, Malang, Bontang, Makassar, Palembang, Kediri'
			},
			{
				title:'Berapa jumlah pinjaman dan tenor yang dapat saya ajukan',
				description:'Jumlah pinjaman yang tersedia di Pinjam Gampang mulai dari Rp600.000 sampai dengan Rp5.000.000 dengan pilihan tenor 7 hari atau 14 hari.'
			},
			{
				title:'Kota mana saja yang termasuk dalam area jangkauan Pinjam Gampang',
				description:'Hingga saat ini, Pinjam Gampang telah tersedia di 20 (dua puluh) wilayah berikut – Jabodetabek, Bandung, Surabaya, Manado, Semarang, Sidoarjo, Batam, Padang, Denpasar, Yogyakarta, Gresik, Malang, Bontang, Makassar, Palembang, Kediri.||| Cek website www.kreditplusteknologi.id dan akun sosial media (Facebook, Instagram, LinkedIn) untuk perkembangan lebih lanjut !'
			},
			{
				title:'Bank mana saja yang dapat digunakan untuk pengiriman dana pinjaman',
				description:'Pinjam Gampang telah bekerjasama dengan beberapa bank berikut untuk proses pengiriman dana pinjaman – Bank Mandiri, BCA, BNI, BRI, BTN, CIMB, Bank Permata, Bank Panin, Bank Danamon Indonesia. '
			},
			{
				title:'Bagaimana cara menghubungi Pinjam Gampang',
				description:'Anda dapat menghubungi customer service kami pada nomor (021) 3003 3358. ||| Jam operasional : Senin – Jumat antara jam 09.00 – 12.00 dan jam 13.00 – 17.00. ||| Atau melalui email ke kpt@kreditplusteknologi.id'
			},
			{
				title:'Bagaimana cara mengajukan pinjaman di Pinjam Gampang',
				description:'1. Register/Login aplikasi Pinjam Gampang ||| 2. Pilih jumlah dan jangka waktu pinjaman yang diinginkan ||| 3. Melakukan verifikasi wajah dan mengisi identitas dasar seperti identitas diri dan informasi pekerjaan ||| 4. Jika Anda lolos verifikasi, Anda akan diberikan detail informasi jumlah pinjaman yang disetujui berserta rincian bunga dan biaya. Apabila Anda setuju, pinjaman Anda akan diproses dalam waktu 24 jam untuk dikirimkan ke rekening bank Anda'
			},
			{
				title:'Berapa hari diperlukan untuk proses verifikasi',
				description:'Proses verifikasi diperkirakan 1 (satu) hingga 5 (hari) kerja. Selama menunggu, dipastikan bahwa nomor telepon Anda adalah aktif agar dapat dihubungi untuk konfirmasi dari pihak kami.'
			},
			{
				title:'Berapa hari diperlukan untuk pencairan pinjaman',
				description:'Setelah lolos proses verifikasi, dibutuhkan waktu 1 (satu) hingga 3 (tiga) hari kerja untuk proses pencairan dana. Jika Anda masih belum menerima pencairan pinjaman Anda, silahkan hubungi layanan customer service kami di (021) 3003 3358.'
			},
			{
				title:'Apakah terdapat risiko kebocoran data yang disampaikan kepada Pinjam Gampang',
				description:'Pinjam Gampang selalu berusaha melindungi informasi Anda, termasuk keamanan informasi berbentuk fisik, elektronik, termasuk namun tidak terbatas pada SSL, penyimpanan enskripsi informasi, pengendalian akses pusat data. Kami sedang dalam tahap penilaian dan penerapan standar internasional organisasi (ISO) 27001 tentang keamanan data.'
			},
			{
				title:'Bagaiman cara mengganti nomor HP dan informasi identitas lainnya',
				description:'Silahkan hubungi layanan customer service kami untuk melakukan perubahan nomor telepon dan informasi identitas lainnya. ||| Kedepannya, Pinjam Gampang akan menambahkan fungsi penggantian nomor telepon untuk memudahkan Anda.'
			},
			{
				title:'Bagaimana cara melakukan pelunasan pinjaman',
				description:'Sebelum tanggal jatuh tempo, Pinjam Gampang akan mengirimkan SMS untuk mengingatkan Anda tentang tanggal jatuh tempo dan jumlah pinjaman Anda. ||| Anda dapat melakukan pelunasan melalui metode transfer dari mesin ATM, mobile banking, internet banking, atau melalui mini-market seperti Alfamart/AlfaMidi/Alfa Express/Lawson/DAN+DAN. ||| Jika Anda sudah melakukan pelunasan, Pinjam Gampang akan secara otomatis menerima pelunasan dan mengubah status pinjaman Anda menjadi lunas.'
			},
			{
				title:'Apa akibatnya jika saya melakukan pembayaran setelah tanggal jatuh tempo',
				description:'Setiap keterlambatan pelunasan akan dikenakan biaya keterlambatan dimana perincian biaya keterlambatan tertera di dalam aplikasi dan informasi lebih lanjut silahkan baca di "Perjanjian Pinjaman"'
			},
			{
				title:'Sudah melakukan pembayaran pinjaman, mengapa masih menerima SMS penagihan',
				description:'Sistem akan melakukan pembaruan halaman setelah Anda berhasil melakukan pembayaran pinjaman, sebelum pembaruan halaman dan sistem terjadi, SMS masih dapat terkirim. Mohon abaikan SMS penagihan jika Anda telah berhasil melakukan pembayaran pinjaman.'
			}
		]
	}
];
export default question
