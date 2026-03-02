# Walkthrough: Backend Todolist Express.js ✅

## Yang Sudah Dibuat

Proyek backend Express.js untuk todolist berjalan di `http://localhost:3000` dengan 5 endpoint CRUD lengkap.

## Struktur Project

```
pengaplikasian-crud-ai/
├── src/
│   ├── index.js                    # Entry point & middleware setup
│   ├── routes/todos.js             # Route definitions
│   ├── controllers/todosController.js  # Business logic CRUD
│   └── data/store.js               # In-memory storage (array)
├── .env                            # PORT=3000
├── .gitignore                      # node_modules/, .env
└── package.json                    # dependencies + scripts
```

## Cara Menjalankan

```bash
# Development (auto-reload dengan nodemon)
npm run dev

# Production
npm start
```

## Endpoint API

| Method | URL | Deskripsi |
|--------|-----|-----------|
| GET | `/api/todos` | Ambil semua todo |
| GET | `/api/todos/:id` | Ambil satu todo |
| POST | `/api/todos` | Buat todo baru |
| PUT | `/api/todos/:id` | Update (partial) |
| DELETE | `/api/todos/:id` | Hapus todo |

## Format Response (Konsisten)

```json
{
  "success": true,
  "message": "Berhasil mengambil semua todo",
  "data": [ ... ]
}
```

## Hasil Testing — Semua PASSED ✅

| # | Test | Status |
|---|------|--------|
| 1 | GET `/` health check | ✅ PASSED |
| 2 | GET `/api/todos` semua todo | ✅ PASSED |
| 3 | GET `/api/todos/1` satu todo | ✅ PASSED |
| 4 | POST create todo baru | ✅ PASSED |
| 5 | PUT update `completed: true` | ✅ PASSED |
| 6 | DELETE hapus todo | ✅ PASSED |
| 7 | GET 404 ID tidak ditemukan | ✅ PASSED |

## Contoh Penggunaan di React (Axios)

```js
import axios from 'axios';

const API = 'http://localhost:3000/api/todos';

// GET semua
const { data } = await axios.get(API);

// POST buat baru
await axios.post(API, { title: 'Belajar React', description: '...' });

// PUT update
await axios.put(`${API}/${id}`, { completed: true });

// DELETE hapus
await axios.delete(`${API}/${id}`);
```
