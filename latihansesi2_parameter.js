/**
 * 1. PENGEMBANGAN FUNGSI (ARROW FUNCTIONS)
 * Membuat kode lebih ringkas dan modern.
 */
const sambutan = (nama = "Tamu", waktu = "Hari") => {
  return `Selamat ${waktu}, ${nama}! Selamat datang di sistem kami.`;
};

console.log(sambutan("Adam Anugrah", "Siang"));
console.log(sambutan()); // Menggunakan default parameter

/**
 * 2. MANIPULASI OBJEK & DESTRUCTURING
 * Cara efisien mengambil data dari objek atau array.
 */
const profilGuru = {
  nama: "Adam Anugrah",
  gender: "Laki-Laki",
  nip: "19920101202401",
  kontak: {
    email: "adam@school.id",
    telepon: "08123456789",
  },
  mataPelajaran: ["Informatika", "Matematika"],
};

// Destructuring: Mengambil properti langsung menjadi variabel
const {
  nama,
  nip,
  kontak: { email },
} = profilGuru;
const [mapelUtama] = profilGuru.mataPelajaran;

console.log(`Pendidik: ${nama} (NIP: ${nip})`);
console.log(`Email: ${email} | Fokus: ${mapelUtama}`);

/**
 * 3. ARRAY METHODS (MAP & FILTER)
 * Sangat berguna untuk mengolah data tabel guru/siswa.
 */
const daftarNilai = [85, 90, 78, 92, 60, 88];

// Filter: Mencari nilai di atas KKM (misal 75)
const lulus = daftarNilai.filter((n) => n >= 75);

// Map: Mengubah angka menjadi format teks tertentu
const formatNilai = daftarNilai.map((n) => `Skor: ${n}`);

console.log("Nilai Lulus:", lulus);
console.log("Daftar Terformat:", formatNilai);

/**
 * 4. SPREAD & REST OPERATOR (...)
 * Untuk menggabungkan data dengan elegan.
 */
const dataLama = { status: "Aktif", tahunMasuk: 2020 };
const dataBaru = { ...profilGuru, ...dataLama, jabatan: "Kepala Lab" };

console.log("Data Gabungan:", dataBaru);

/**
 * 5. PENGECEKAN KONDISI MODERN (TERNARY & NULLISH)
 * Menggantikan if-else sederhana.
 */
let statusVerifikasi = true;

// Ternary Operator
const akses = statusVerifikasi ? "Akses Diberikan" : "Akses Ditolak";
console.log(`Status Keamanan: ${akses}`);

// Nullish Coalescing (??) - Memberikan nilai default jika null/undefined
let bioData = null;
console.log(bioData ?? "Biodata belum diisi oleh guru.");

/**
 * 6. ASYNC/AWAIT (SIMULASI AMBIL DATA)
 * Dasar dari fitur sinkronisasi data (seperti tombol "EKSEKUSI" di Blade Anda).
 */
const ambilDataGuru = async () => {
  console.log("Sedang menyambungkan ke pusat data...");

  // Simulasi jeda server
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const sukses = true;
  if (sukses) {
    console.log("✅ Sinkronisasi Berhasil: Data Repositori diperbarui.");
  } else {
    console.error("❌ Gagal mengambil data.");
  }
};

ambilDataGuru();
