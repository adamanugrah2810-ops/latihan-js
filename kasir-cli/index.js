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

  // Merender tampilan kartu mewah di katalog
  renderCard() {
    return `
      <div class="product-card" onclick="isiKodeOtomatis('${this.kode}')">
        <span class="p-code">${this.kode}</span>
        <span class="p-name">${this.nama}</span>
        <span class="p-price">Rp ${this.harga.toLocaleString("id-ID")}</span>
      </div>
    `;
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
    this.produkList = [
      new Produk("P001", "Indomie", 4000),
      new Produk("P002", "Teh Botol", 5000),
      new Produk("P003", "Roti", 4000),
      new Produk("P004", "Air Mineral", 3000),
      new Produk("P005", "Kopi Sachet", 2500),
      new Produk("P006", "Susu Kotak", 6000),
      new Produk("P007", "Biskuit", 7000),
      new Produk("P008", "Chitato", 9000),
      new Produk("P009", "Coklat", 8000),
      new Produk("P010", "Permen", 2000),
    ];
    this.keranjang = [];
  }

  // Menampilkan katalog dalam bentuk GRID CARDS
  tampilProduk() {
    const listEl = document.getElementById("daftar-produk");
    if (listEl) {
      listEl.innerHTML = this.produkList.map((p) => p.renderCard()).join("");
    }
  }

  tambahTransaksi(kode, qty) {
    const inputKode = kode.trim().toUpperCase();
    const produk = this.produkList.find((p) => p.kode === inputKode);

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

// Fungsi bantuan untuk klik kartu produk
function isiKodeOtomatis(kode) {
  document.getElementById("kode").value = kode;
  document.getElementById("qty").focus();
}

// Tombol: TAMBAH ITEM
function tambahItem() {
  const kodeInput = document.getElementById("kode");
  const qtyInput = document.getElementById("qty");

  const kode = kodeInput.value;
  const qty = parseInt(qtyInput.value);

  if (kode === "" || isNaN(qty) || qty <= 0) {
    alert("Mohon isi kode produk dan jumlah yang valid!");
    return;
  }

  if (kasir.tambahTransaksi(kode, qty)) {
    updateTampilanStruk();
    resetInput();
    kodeInput.focus();
  }
}

// Tombol: RESET (Hanya input)
function resetInput() {
  document.getElementById("kode").value = "";
  document.getElementById("qty").value = "1";
}

// Update Panel Kanan (Ringkasan Belanja)
function updateTampilanStruk() {
  const isiStruk = document.getElementById("isi-struk");
  const totalBayar = document.getElementById("total-bayar");

  if (kasir.keranjang.length === 0) {
    isiStruk.innerHTML = `
      <div style="text-align: center; color: var(--text-dim); margin-top: 50px">
        <i data-lucide="archive" size="48" style="opacity: 0.2; margin-bottom: 10px"></i>
        <p>Belum ada item ditambahkan</p>
      </div>
    `;
    totalBayar.innerText = "Rp 0";
    if (window.lucide) lucide.createIcons();
    return;
  }

  isiStruk.innerHTML = kasir.keranjang
    .map(
      (item) => `
      <div class="cart-item">
        <span>${item.nama} <small>(x${item.qty})</small></span>
        <strong>Rp ${item.total().toLocaleString("id-ID")}</strong>
      </div>
    `,
    )
    .join("");

  totalBayar.innerText = `Rp ${kasir.hitungTotal().toLocaleString("id-ID")}`;
}

// Tombol: SELESAIKAN TRANSAKSI
function selesaikanTransaksi() {
  if (kasir.keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const totalAkhir = kasir.hitungTotal().toLocaleString("id-ID");
  if (confirm(`Total Belanja: Rp ${totalAkhir}\nSelesaikan transaksi?`)) {
    alert(`✅ Berhasil! Total Rp ${totalAkhir} dicatat.`);
    kasir.keranjang = [];
    updateTampilanStruk();
    resetInput();
  }
}

// Sinkronisasi dengan tombol di HTML (jika Anda menggunakan nama fungsi resetKasir di HTML)
const resetKasir = selesaikanTransaksi;
