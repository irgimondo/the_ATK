# Aplikasi Manajemen Stok ATK

Aplikasi web full-stack untuk mengelola stok Alat Tulis Kantor (ATK) dengan fitur CRUD lengkap.

## Teknologi yang Digunakan

### Backend

-   **Python FastAPI** - Framework web modern dan cepat
-   **SQLite** - Database lokal
-   **Pydantic** - Validasi data
-   **Uvicorn** - ASGI server

### Frontend

-   **React** - Library UI JavaScript
-   **Axios** - HTTP client
-   **CSS3** - Styling dengan desain responsive

## Struktur Proyek

```
the_ATK/
│
├── backend/
│   ├── main.py              # Entry point & API endpoints
│   ├── schemas.py           # Pydantic models untuk validasi
│   ├── database.py          # Database operations
│   ├── requirements.txt     # Python dependencies
│   └── atk_database.db      # SQLite database (auto-generated)
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── AtkTable.jsx      # Komponen tabel data
    │   │   ├── AtkTable.css
    │   │   ├── AtkForm.jsx       # Komponen form input
    │   │   ├── AtkForm.css
    │   │   ├── ConfirmModal.jsx  # Komponen modal konfirmasi
    │   │   └── ConfirmModal.css
    │   ├── services/
    │   │   └── api.js            # API service dengan axios
    │   ├── App.jsx               # Main component
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Cara Menjalankan Aplikasi

### 1. Setup Backend

```powershell
# Masuk ke folder backend
cd backend

# Install dependencies
pip install fastapi uvicorn pydantic

# Atau install dari requirements.txt
pip install -r requirements.txt

# Jalankan server
uvicorn main:app --reload
```

Backend akan berjalan di: **http://localhost:8000**

API Documentation (Swagger): **http://localhost:8000/docs**

### 2. Setup Frontend

Buka terminal baru:

```powershell
# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Jalankan aplikasi
npm start
```

Frontend akan berjalan di: **http://localhost:3000**

## API Endpoints

| Method | Endpoint        | Deskripsi                           |
| ------ | --------------- | ----------------------------------- |
| GET    | `/api/atk`      | Mendapatkan semua data ATK          |
| GET    | `/api/atk/{id}` | Mendapatkan data ATK berdasarkan ID |
| POST   | `/api/atk`      | Menambah data ATK baru              |
| PUT    | `/api/atk/{id}` | Mengubah data ATK                   |
| DELETE | `/api/atk/{id}` | Menghapus data ATK                  |

### Contoh Request Body

```json
{
    "nama": "Pulpen Gel Hitam",
    "jenis": "Alat Tulis",
    "qty": 12
}
```

### Contoh Response

```json
{
    "id": 1,
    "nama": "Pulpen Gel Hitam",
    "jenis": "Alat Tulis",
    "qty": 12
}
```

## Fitur Aplikasi

### Frontend

-   Menampilkan daftar stok ATK dalam tabel
-   Form untuk menambah data baru
-   Edit data dengan form yang sama
-   Hapus data dengan konfirmasi
-   Validasi input sebelum submit
-   Error handling dengan pesan yang jelas
-   Loading state saat fetching data
-   Responsive design (desktop & mobile)
-   UI modern dan user-friendly

### Backend

-   REST API dengan FastAPI
-   CRUD operations lengkap
-   Validasi data dengan Pydantic
-   Error handling dan response yang konsisten
-   CORS enabled untuk frontend
-   SQLite database dengan auto-increment ID
-   API documentation otomatis (Swagger)

## Validasi Data

-   **nama**: Tidak boleh kosong
-   **jenis**: Tidak boleh kosong
-   **qty**: Harus angka integer lebih dari 0

## Tampilan Responsive

Aplikasi dapat diakses dengan baik di:

-   Desktop (1200px+)
-   Tablet (768px - 1199px)
-   Mobile (< 768px)

## Desain UI

-   Gradient header dengan warna modern
-   Tabel dengan hover effect
-   Button dengan hover animation
-   Form validation visual
-   Error banner dengan dismiss button
-   Loading state yang informatif
-   Empty state ketika belum ada data

## Troubleshooting

### Backend tidak bisa diakses

-   Pastikan port 8000 tidak digunakan aplikasi lain
-   Check apakah uvicorn sudah terinstall
-   Lihat error message di terminal

### Frontend tidak bisa connect ke backend

-   Pastikan backend sudah running di port 8000
-   Check CORS configuration di `backend/main.py`
-   Lihat network tab di browser DevTools

### Database error

-   Database SQLite akan otomatis dibuat saat pertama kali dijalankan
-   Jika ada error, coba hapus file `atk_database.db` dan restart backend

## Catatan Pengembangan

-   Database SQLite disimpan di folder backend dengan nama `atk_database.db`
-   CORS dikonfigurasi untuk accept request dari `localhost:3000` dan `localhost:5173`
-   Auto-reload diaktifkan di development mode
