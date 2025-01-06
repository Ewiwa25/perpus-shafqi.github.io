// Fungsi untuk membersihkan input dari karakter berbahaya
function sanitizeInput(input) {
  const temp = document.createElement("div");
  temp.textContent = input;
  return temp.innerHTML;
}

// Validasi login
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = sanitizeInput(document.getElementById("username").value);
  const password = sanitizeInput(document.getElementById("password").value);

  if (username === "" || password === "") {
    alert("Semua field harus diisi!");
  } else {
    alert("Login berhasil!");
    window.location.href = "index.html";
  }
});

// Validasi dan penyimpanan transaksi ke localStorage
document.getElementById("transaksiForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const namaTransaksi = sanitizeInput(document.getElementById("nama-transaksi").value);
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const kategori = sanitizeInput(document.getElementById("kategori").value);

  if (jumlah <= 0) {
    alert("Jumlah harus lebih besar dari nol!");
    return;
  }

  let transaksiList = JSON.parse(localStorage.getItem("transaksi")) || [];

  const transaksi = { namaTransaksi, jumlah, kategori };

  transaksiList.push(transaksi);
  localStorage.setItem("transaksi", JSON.stringify(transaksiList));

  document.getElementById("transaksiForm").reset();
  tambahBaris(transaksi);
});

// Fungsi untuk menambahkan baris baru ke tabel
function tambahBaris(transaksi) {
  const transaksiTable = document.getElementById("transaksi-table").getElementsByTagName("tbody")[0];
  let row = transaksiTable.insertRow();

  row.insertCell(0).textContent = transaksi.namaTransaksi;
  row.insertCell(1).textContent = transaksi.jumlah;
  row.insertCell(2).textContent = transaksi.kategori;

  // Tambahkan tombol hapus
  let cellHapus = row.insertCell(3);
  let hapusButton = document.createElement("button");
  hapusButton.textContent = "Hapus";
  hapusButton.addEventListener("click", function () {
    hapusTransaksi(row);
  });
  cellHapus.appendChild(hapusButton);
}

// Fungsi untuk menghapus transaksi
function hapusTransaksi(row) {
  let transaksiList = JSON.parse(localStorage.getItem("transaksi")) || [];
  const index = Array.from(row.parentNode.children).indexOf(row);

  transaksiList.splice(index, 1);
  localStorage.setItem("transaksi", JSON.stringify(transaksiList));
  row.remove();
}

// Load data transaksi dari localStorage
window.onload = function () {
  let transaksiList = JSON.parse(localStorage.getItem("transaksi")) || [];
  transaksiList.forEach(tambahBaris);

  document.getElementById("clearData")?.addEventListener("click", function () {
    if (confirm("Apakah Anda yakin ingin menghapus semua data transaksi?")) {
      localStorage.removeItem("transaksi");
      document.getElementById("transaksi-table").getElementsByTagName("tbody")[0].innerHTML = "";
    }
  });
};

// Slideshow Banner
let currentSlide = 0;
const slides = document.querySelectorAll(".banner-slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 1900); // Change slide every 3 seconds
showSlide(currentSlide); // Show the first slide initially
