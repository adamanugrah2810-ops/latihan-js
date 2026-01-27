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

const kasir = new Kasir();
kasir.tampilProduk();

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
    updateTampilanStruk();
    kodeInput.value = "";
    qtyInput.value = "1";
    kodeInput.focus();
  }
}

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

  // Menampilkan kotak struk jika sebelumnya tersembunyi
  if (strukBox) {
    strukBox.style.display = "block";
  }

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

// Tombol Pratinjau sekarang memaksa tampilan struk muncul
function tampilkanStruk() {
  if (kasir.keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }
  updateTampilanStruk();
  alert("Pratinjau struk telah diperbarui!");
}

function resetKasir() {
  if (kasir.keranjang.length === 0) return;

  if (confirm("Apakah Anda ingin menyelesaikan transaksi ini?")) {
    kasir.keranjang = [];
    updateTampilanStruk();
    alert("✅ Transaksi Berhasil Diselesaikan!");
  }
}
