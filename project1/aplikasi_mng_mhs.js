// 1. Membuat Class Induk (Parent Class)
class Mahasiswa {
  constructor(nim, nama, nilai) {
    this.nim = nim;
    this.nama = nama;
    this.nilai = nilai;
  }

  tampilkan() {
    console.log(`NIM   : ${this.nim}`);
    console.log(`Nama  : ${this.nama}`);
    console.log(`Nilai : ${this.nilai}`);
  }

  cekKelulusan() {
    return this.nilai >= 60 ? "LULUS" : "TIDAK LULUS";
  }
}

class MahasiswaAktif extends Mahasiswa {
  constructor(nim, nama, nilai, semester) {
    super(nim, nama, nilai);
    this.semester = semester;
  }

  tampilkan() {
    super.tampilkan();
    console.log(`Semester : ${this.semester}`);
    console.log(`Status   : ${this.cekKelulusan()}`);
  }
}

console.log("Data Mahasiswa");
console.log("--------------------");

const mhs1 = new MahasiswaAktif("231334", "Adam Anugrah", 85, 4);

mhs1.tampilkan();
