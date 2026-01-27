/**
 * Aplikasi Kasir Modern - Premium POS
 * Developed by Adam Anugrah
 */

class Produk {
  constructor(kode, nama, harga) {
    this.kode = kode;
    this.nama = nama;
    this.harga = harga;
  }

  info() {
    // Template untuk daftar katalog produk agar rapi di dashboard
    return `<span>${this.kode} - ${this.nama}</span> <span>Rp${this.harga.toLocaleString()}</span>`;
  }
}

class Transaksi extends Produk {
  constructor(kode, nama, harga, qty) {
    super(kode, nama, harga);
    this.qty = qty;
  }

  total() {
    return this.harga * this.qty;
  }
}

class Kasir {
  constructor() {
    // Daftar produk default
    this.produkList = [
      new Produk("P001", "Indomie", 4000),
      new Produk("P002", "Teh Botol", 5000),
      new Produk("P003", "Roti", 4000),
    ];
    this.keranjang = [];
  }

  tampilProduk() {
    const listEl = document.getElementById("daftar-produk");
    if (listEl) {
      listEl.innerHTML = this.produkList
        .map((p) => `<li>${p.info()}</li>`)
        .join("");
    }
  }

  tambahTransaksi(kode, qty) {
    // Menghapus spasi dan case-insensitive agar input lebih fleksibel
    const inputKode = kode.trim().toLowerCase();
    const produk = this.produkList.find(
      (p) => p.kode.toLowerCase() === inputKode,
    );

    if (!produk) {
      alert(`❌ Produk dengan kode "${kode}" tidak ditemukan!`);
      return false;
    }

    this.keranjang.push(
      new Transaksi(produk.kode, produk.nama, produk.harga, qty),
    );
    return true;
  }

  hitungTotal() {
    return this.keranjang.reduce((total, item) => total + item.total(), 0);
  }
}

// Inisialisasi Objek Kasir
const kasir = new Kasir();
kasir.tampilProduk();

// Fungsi untuk tombol "+ Tambah ke Keranjang"
function tambahItem() {
  const kodeInput = document.getElementById("kode");
  const qtyInput = document.getElementById("qty");

  const kode = kodeInput.value;
  const qty = parseInt(qtyInput.value);

  if (kode === "" || isNaN(qty) || qty <= 0) {
    alert("Mohon isi kode produk dan jumlah (qty) yang valid!");
    return;
  }

  const berhasil = kasir.tambahTransaksi(kode, qty);

  if (berhasil) {
    // Otomatis memperbarui tampilan di sisi kanan
    updateTampilanStruk();

    // Reset form dan fokus kembali ke input kode
    kodeInput.value = "";
    qtyInput.value = "1";
    kodeInput.focus();
  }
}

// Fungsi utama untuk merender daftar belanja ke panel kanan (Struk)
function updateTampilanStruk() {
  const strukBox = document.getElementById("struk-output");
  const isiStruk = document.getElementById("isi-struk");
  const totalBayar = document.getElementById("total-bayar");

  if (kasir.keranjang.length === 0) {
    isiStruk.innerHTML = `<p style="color: #94a3b8; text-align: center; border: none; width: 100%;">Belum ada item ditambahkan</p>`;
    totalBayar.innerText = "Rp 0";
    if (strukBox) strukBox.style.display = "none";
    return;
  }

  // Paksa struk muncul jika ada isinya
  if (strukBox) {
    strukBox.style.display = "block";
  }

  // Render semua item yang ada di array keranjang
  isiStruk.innerHTML = kasir.keranjang
    .map(
      (item) => `
      <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 12px; margin-bottom: 10px; border: 1px solid rgba(255,255,255,0.05);">
        <span><strong>${item.nama}</strong> <small>(x${item.qty})</small></span>
        <span>Rp${item.total().toLocaleString()}</span>
      </div>
    `,
    )
    .join("");

  totalBayar.innerText = `Rp ${kasir.hitungTotal().toLocaleString()}`;
}

// Tombol Pratinjau untuk memastikan tampilan segar
function tampilkanStruk() {
  if (kasir.keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }
  updateTampilanStruk();
  alert("Pratinjau struk telah diperbarui!");
}

// Fungsi Selesaikan Transaksi dengan alur konfirmasi
function resetKasir() {
  if (kasir.keranjang.length === 0) return;

  const totalAkhir = kasir.hitungTotal().toLocaleString();
  const konfirmasi = confirm(
    `Total Belanja: Rp ${totalAkhir}\n\nSelesaikan transaksi dan reset keranjang?`,
  );

  if (konfirmasi) {
    alert(`✅ Transaksi Berhasil!\nTotal Rp ${totalAkhir} telah dicatat.`);

    // Bersihkan data setelah konfirmasi
    kasir.keranjang = [];
    updateTampilanStruk();
    document.getElementById("kode").focus();
  }
}
