const inquirer = require("inquirer").default;

class Produk {
  constructor(kode, nama, harga) {
    this.kode = kode;
    this.nama = nama;
    this.harga = harga;
  }

  info() {
    return `${this.kode} - ${this.nama} (Rp${this.harga})`;
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
      new Produk("P001", "Indomie", 3000),
      new Produk("P002", "Teh Botol", 5000),
      new Produk("P003", "Roti", 4000),
    ];
    this.keranjang = [];
  }

  tampilProduk() {
    console.log("\n=== DAFTAR PRODUK ===");
    this.produkList.forEach((p) => console.log(p.info()));
  }

  tambahTransaksi(kode, qty) {
    const produk = this.produkList.find((p) => p.kode === kode);
    if (!produk) {
      console.log("❌ Produk tidak ditemukan");
      return;
    }

    this.keranjang.push(
      new Transaksi(produk.kode, produk.nama, produk.harga, qty),
    );
  }

  hitungTotal() {
    return this.keranjang.reduce((total, item) => total + item.total(), 0);
  }

  cetakStruk() {
    console.log("\n=== STRUK PEMBELIAN ===");
    this.keranjang.forEach((item) => {
      console.log(`${item.nama} x${item.qty} = Rp${item.total()}`);
    });
    console.log("----------------------");
    console.log(`TOTAL BAYAR : Rp${this.hitungTotal()}`);
  }
}

async function main() {
  const kasir = new Kasir();
  kasir.tampilProduk();

  let lanjut = true;

  while (lanjut) {
    const input = await inquirer.prompt([
      {
        type: "input",
        name: "kode",
        message: "Masukkan kode produk:",
      },
      {
        type: "number",
        name: "qty",
        message: "Masukkan jumlah:",
      },
      {
        type: "confirm",
        name: "lanjut",
        message: "Tambah produk lagi?",
      },
    ]);

    kasir.tambahTransaksi(input.kode, input.qty);
    lanjut = input.lanjut;
  }

  kasir.cetakStruk();
}

main();
