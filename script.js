// DATA AWAL
var data = [
  {
    nim: "2018804123",
    nama: "ANDIKA",
    alamat: "Jakarta",
    jk: "Pria",
    jurusan: "Sistem Informasi",
    foto: null,
  },
  {
    nim: "2018804124",
    nama: "DIANA",
    alamat: "Bogor",
    jk: "Wanita",
    jurusan: "Sistem Informasi",
    foto: null,
  },
  {
    nim: "2018804125",
    nama: "DIKA",
    alamat: "Depok",
    jk: "Pria",
    jurusan: "Sistem Informasi",
    foto: null,
  },
  {
    nim: "2018804126",
    nama: "NANA",
    alamat: "Tangerang",
    jk: "Wanita",
    jurusan: "Teknik Informatika",
    foto: null,
  },
  {
    nim: "2018804127",
    nama: "DEKA",
    alamat: "Bekasi",
    jk: "Pria",
    jurusan: "Teknik Informatika",
    foto: null,
  },
  {
    nim: "2018804128",
    nama: "SASA",
    alamat: "Cikupa",
    jk: "Wanita",
    jurusan: "Teknik Informatika",
    foto: null,
  },
];

var nimTersimpan = null;

// Update label nim & nama saat mengetik
function updateLabel() {
  document.getElementById("label-nim").innerText =
    document.getElementById("nim").value || "—";
  document.getElementById("label-nama").innerText =
    document.getElementById("nama").value.toUpperCase() || "—";
}

// Simpan data
function simpan() {
  var nim = document.getElementById("nim").value.trim();
  var nama = document.getElementById("nama").value.trim().toUpperCase();
  var alamat = document.getElementById("alamat").value.trim();
  var jkEl = document.querySelector("input[name='jk']:checked");
  var jurusan = document.getElementById("jurusan").value;

  if (!nim) {
    notif("NIM wajib diisi!", "merah");
    return;
  }
  if (!nama) {
    notif("Nama wajib diisi!", "merah");
    return;
  }
  if (!alamat) {
    notif("Alamat wajib diisi!", "merah");
    return;
  }
  if (!jkEl) {
    notif("Pilih jenis kelamin!", "merah");
    return;
  }
  if (!jurusan) {
    notif("Pilih jurusan!", "merah");
    return;
  }

  for (var i = 0; i < data.length; i++) {
    if (data[i].nim == nim) {
      notif("NIM sudah ada!", "merah");
      return;
    }
  }

  data.push({
    nim: nim,
    nama: nama,
    alamat: alamat,
    jk: jkEl.value,
    jurusan: jurusan,
    foto: null,
  });
  nimTersimpan = nim;

  document.getElementById("kotak-foto").style.cursor = "pointer";
  document.getElementById("panel-upload").style.display = "block";
  notif("Data berhasil disimpan!", "hijau");
  tampilTabel();
}

// Hapus data
function hapus(nim) {
  if (!confirm("Hapus data NIM " + nim + "?")) return;
  for (var i = 0; i < data.length; i++) {
    if (data[i].nim == nim) {
      data.splice(i, 1);
      break;
    }
  }
  if (nimTersimpan == nim) {
    nimTersimpan = null;
    document.getElementById("panel-upload").style.display = "none";
    resetFoto();
  }
  notif("Data dihapus.", "hijau");
  tampilTabel();
}

// Bersihkan form
function bersihkan() {
  document.getElementById("nim").value = "";
  document.getElementById("nama").value = "";
  document.getElementById("alamat").value = "";
  var radios = document.querySelectorAll("input[name='jk']");
  for (var i = 0; i < radios.length; i++) radios[i].checked = false;
  document.getElementById("jurusan").value = "";
  document.getElementById("label-nim").innerText = "—";
  document.getElementById("label-nama").innerText = "—";
  document.getElementById("panel-upload").style.display = "none";
  nimTersimpan = null;
  resetFoto();
}

// Reset foto ke kondisi awal
function resetFoto() {
  document.getElementById("gambar-foto").style.display = "none";
  document.getElementById("gambar-foto").src = "";
  document.getElementById("ikon-foto").style.display = "inline";
  document.getElementById("kotak-foto").style.cursor = "default";
}

// Klik kotak foto
function klikFoto() {
  if (!nimTersimpan) {
    notif("Simpan data dulu!", "merah");
    return;
  }
  document.getElementById("input-foto").click();
}

// Upload foto
function uploadFoto(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function (ev) {
    var src = ev.target.result;
    document.getElementById("ikon-foto").style.display = "none";
    document.getElementById("gambar-foto").src = src;
    document.getElementById("gambar-foto").style.display = "block";
    for (var i = 0; i < data.length; i++) {
      if (data[i].nim == nimTersimpan) {
        data[i].foto = src;
        break;
      }
    }
    document.getElementById("panel-upload").style.display = "none";
    tampilTabel();
    notif("Foto berhasil diupload!", "hijau");
  };
  reader.readAsDataURL(file);
  e.target.value = "";
}

// Tampilkan tabel
function tampilTabel() {
  var tabel = document.getElementById("tabel-data");
  var pesan = document.getElementById("pesan-kosong");
  var isi = document.getElementById("isi-tabel");

  if (data.length == 0) {
    tabel.style.display = "none";
    pesan.style.display = "block";
    return;
  }

  tabel.style.display = "table";
  pesan.style.display = "none";

  var html = "";
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    var fotoHtml = d.foto
      ? '<img src="' + d.foto + '" class="foto-tabel">'
      : "";
    html += "<tr>";
    html += "<td>" + d.nim + "</td>";
    html += "<td>" + fotoHtml + d.nama + "</td>";
    html += "<td>" + d.jk + "</td>";
    html += "<td>" + d.jurusan + "</td>";
    html +=
      '<td><button class="tombol-hapus" onclick="hapus(\'' +
      d.nim +
      "')\">Hapus</button></td>";
    html += "</tr>";
  }
  isi.innerHTML = html;
}

// Notifikasi
var timer;
function notif(pesan, warna) {
  var el = document.getElementById("notif");
  el.innerText = pesan;
  el.style.display = "block";
  el.style.backgroundColor = warna == "hijau" ? "#d4edda" : "#f8d7da";
  el.style.color = warna == "hijau" ? "#155724" : "#721c24";
  el.style.border = "1px solid " + (warna == "hijau" ? "#c3e6cb" : "#f5c6cb");
  clearTimeout(timer);
  timer = setTimeout(function () {
    el.style.display = "none";
  }, 3000);
}

// Jalankan tabel saat halaman pertama dibuka
tampilTabel();
