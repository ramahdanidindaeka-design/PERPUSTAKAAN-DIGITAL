/* ==========================================
   1. FITUR PENCARIAN BUKU (BERANDA / INDEX)
   ========================================== */
function searchBook() {
    // Mengambil nilai teks dari kolom pencarian
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase().trim();
    
    // Mengambil semua kartu buku yang ada di halaman
    const bookCards = document.querySelectorAll('.book-card');

    bookCards.forEach(card => {
        // Mengambil judul dan deskripsi dari tiap kartu buku
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('.desc').textContent.toLowerCase();

        // Jika judul atau deskripsi cocok dengan kata kunci, tampilkan. Jika tidak, sembunyikan.
        if (title.includes(filter) || desc.includes(filter)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// Menjalankan pencarian otomatis saat pengguna menekan tombol Enter di keyboard
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                searchBook();
            }
        });
    }
});


/* ==========================================
   2. FITUR FILTER KATEGORI (KATALOG BUKU)
   ========================================== */
function filterCategory(category) {
    const bookCards = document.querySelectorAll('.book-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Mengubah tampilan tombol aktif
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Menyaring kartu buku berdasarkan atribut data-category
    bookCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}


/* ==========================================
   3. FITUR TAMBAH ULASAN (DETAIL BUKU)
   ========================================== */
function submitReview(event) {
    // Mencegah formulir memuat ulang (reload) halaman secara otomatis
    event.preventDefault();

    const nameInput = document.getElementById('reviewerName');
    const commentInput = document.getElementById('reviewerComment');
    const reviewList = document.getElementById('reviewList');

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (name !== "" && comment !== "") {
        // Membuat elemen HTML kartu ulasan baru
        const newReview = document.createElement('div');
        newReview.classList.add('review-card');

        newReview.innerHTML = `
            <div class="review-header">
                <strong>${escapeHTML(name)}</strong>
                <span class="review-date">Baru saja</span>
            </div>
            <p>${escapeHTML(comment)}</p>
        `;

        // Menambahkan ulasan baru ke bagian paling atas daftar
        reviewList.prepend(newReview);

        // Mengosongkan form setelah ulasan dikirim
        nameInput.value = "";
        commentInput.value = "";

        alert("Ulasan kamu berhasil ditambahkan!");
    }
}


/* ==========================================
   4. FITUR KONTRIBUSI RINGKASAN
   ========================================== */
function submitContribution(event) {
    event.preventDefault();

    const title = document.getElementById('contribBookTitle').value;
    
    // Menampilkan pesan konfirmasi sukses
    alert(`Terima kasih! Ringkasan "${title}" berhasil dikirim dan akan ditinjau oleh tim OpenShelf.`);

    // Reset formulir
    document.getElementById('contributeForm').reset();
}


/* ==========================================
   5. FITUR SIMPAN FAVORIT (LOCALSTORAGE)
   ========================================== */
function saveBookmark() {
    const bookTitle = document.getElementById('bookTitle') ? document.getElementById('bookTitle').textContent : 'Buku';

    // Mengambil daftar favorit yang tersimpan dari localStorage
    let favorites = JSON.parse(localStorage.getItem('openShelfFavorites')) || [];

    if (!favorites.includes(bookTitle)) {
        favorites.push(bookTitle);
        localStorage.setItem('openShelfFavorites', JSON.stringify(favorites));
        alert(`"${bookTitle}" berhasil disimpan ke daftar favorit kamu!`);
    } else {
        alert(`"${bookTitle}" sudah ada di dalam daftar favorit.`);
    }
}


/* ==========================================
   6. FUNGSI PENGAMAN TEKS (PREVENT XSS)
   ========================================== */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
