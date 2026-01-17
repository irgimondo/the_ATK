# Manajemen Stok ATK

Website full-stack untuk mengelola Alat Tulis Kantor (ATK) dengan CRUD

## Teknologi yang Digunakan

### Backend

- **Python FastAPI** - Framework web modern dan cepat
- **SQLite** - Database lokal
- **Pydantic** - Validasi data
- **Uvicorn** - ASGI server

### Frontend

- **React** - Library UI JavaScript
- **Axios** - HTTP client
- **CSS3** - Styling dengan desain responsive

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

## How to run

### Prerequisites

Pastikan sudah terinstall Python 3.8+, Node.js 14+, dan npm.

### 1. Clone Repository

```powershell
git clone https://github.com/irgimondo/the_ATK.git
cd the_ATK
```

### 2. Setup Backend

```powershell
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend: **http://localhost:8000** | API Docs: **http://localhost:8000/docs**

### 3. Setup Frontend

Buka terminal baru:

```powershell
cd frontend
npm install
npm start
```

Frontend: **http://localhost:3000**

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

## Fitur-fitur

### Frontend

- Menampilkan daftar stok ATK dalam tabel
- Form untuk menambah data baru
- Edit data dengan form yang sama
- Hapus data dengan konfirmasi
- Validasi input sebelum submit
- Error handling dengan pesan yang jelas
- Loading state saat fetching data
- Responsive design (desktop & mobile)
- UI modern dan user-friendly

### Backend

- REST API dengan FastAPI
- CRUD operations lengkap
- Validasi data dengan Pydantic
- Error handling dan response yang konsisten
- CORS enabled untuk frontend
- SQLite database dengan auto-increment ID
- API documentation otomatis (Swagger)

## Troubleshooting

### Backend tidak bisa diakses

- Pastikan port 8000 tidak digunakan aplikasi lain
- Check apakah uvicorn sudah terinstall
- Lihat error message di terminal

### Frontend tidak bisa connect ke backend

- Pastikan backend sudah running di port 8000
- Check CORS configuration di `backend/main.py`
- Lihat network tab di browser DevTools

### Database error

- Database SQLite akan otomatis dibuat saat pertama kali dijalankan
- Jika ada error, coba hapus file `atk_database.db` dan restart backend

## Catatan Pengembangan

- Database SQLite disimpan di folder backend dengan nama `atk_database.db`
- CORS dikonfigurasi untuk accept request dari `localhost:3000` dan `localhost:5173`
- Auto-reload diaktifkan di development mode
