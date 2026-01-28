/**
 * NexGen POS Engine v4.0
 * Developed by Adam Anugrah
 */

// --- 1. MODEL DATA (OOP) ---

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

    // Cari apakah produk sudah ada di keranjang
    const existingItem = this.keranjang.find((item) => item.kode === inputKode);
    if (existingItem) {
      existingItem.qty += qty; // Tambahkan jumlah jika sudah ada
    } else {
      this.keranjang.push(
        new Transaksi(produk.kode, produk.nama, produk.harga, qty),
      );
    }
    return true;
  }

  hitungTotal() {
    return this.keranjang.reduce((total, item) => total + item.total(), 0);
  }
}

// --- 2. INISIALISASI OBJEK ---

const kasir = new Kasir();

// --- 3. LOGIKA AUTH (LOGIN/LOGOUT) ---

const USER_DATA = {
  username: "adam",
  password: "123",
};

function handleLogin() {
  const userIn = document.getElementById("username").value;
  const passIn = document.getElementById("password").value;
  const errorMsg = document.getElementById("login-error");

  if (userIn === USER_DATA.username && passIn === USER_DATA.password) {
    localStorage.setItem("isLoggedIn", "true");
    showApp();
  } else {
    errorMsg.style.display = "block";
    // Efek getar pada login card jika salah
    const card = document.querySelector(".login-card");
    card.classList.remove("animate-shake");
    void card.offsetWidth; // Trigger reflow
    card.classList.add("animate-shake");
  }
}

function showApp() {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("main-app").style.display = "flex";
  kasir.tampilProduk();
  updateTampilanStruk();
  if (window.lucide) lucide.createIcons();
}

function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  location.reload();
}

// --- 4. LOGIKA TRANSAKSI ---

function isiKodeOtomatis(kode) {
  document.getElementById("kode").value = kode;
  document.getElementById("qty").focus();
}

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

function resetInput() {
  document.getElementById("kode").value = "";
  document.getElementById("qty").value = "1";
}

function updateTampilanStruk() {
  const isiStruk = document.getElementById("isi-struk");
  const totalBayar = document.getElementById("total-bayar");

  if (kasir.keranjang.length === 0) {
    isiStruk.innerHTML = `
            <div style="text-align: center; color: var(--text-dim); margin-top: 50px">
                <i data-lucide="archive" size="48" style="opacity: 0.2; margin-bottom: 10px"></i>
                <p>Belum ada transaksi</p>
            </div>
        `;
    totalBayar.innerText = "Rp 0";
  } else {
    isiStruk.innerHTML = kasir.keranjang
      .map(
        (item) => `
                <div class="cart-item">
                    <div style="display: flex; flex-direction: column;">
                        <span style="font-weight: 600; color: white;">${item.nama}</span>
                        <small style="color: var(--text-dim); font-size: 11px;">${item.qty} x Rp ${item.harga.toLocaleString("id-ID")}</small>
                    </div>
                    <strong style="color: var(--accent);">Rp ${item.total().toLocaleString("id-ID")}</strong>
                </div>
            `,
      )
      .join("");

    totalBayar.innerText = `Rp ${kasir.hitungTotal().toLocaleString("id-ID")}`;
  }

  // Refresh ikon lucide setiap kali render HTML baru
  if (window.lucide) lucide.createIcons();
}

function selesaikanTransaksi() {
  if (kasir.keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const totalAkhir = kasir.hitungTotal().toLocaleString("id-ID");
  if (
    confirm(`Konfirmasi Transaksi\nTotal Belanja: Rp ${totalAkhir}\nLanjutkan?`)
  ) {
    alert(
      `✅ Sukses! Transaksi sebesar Rp ${totalAkhir} telah dicatat ke sistem.`,
    );
    kasir.keranjang = [];
    updateTampilanStruk();
    resetInput();
  }
}

// --- 5. EVENT LISTENER AWAL ---

document.addEventListener("DOMContentLoaded", () => {
  const isLogged = localStorage.getItem("isLoggedIn");
  if (isLogged === "true") {
    showApp();
  }
});
