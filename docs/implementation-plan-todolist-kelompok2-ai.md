# Backend Todolist Express.js

Backend REST API sederhana untuk aplikasi todolist menggunakan Express.js, berjalan di `localhost:3000`. Menggunakan **in-memory storage** (array) sehingga tidak butuh database, mudah diganti dengan database nyata (MySQL/MongoDB) di masa depan. Setiap endpoint didesain dengan response format JSON yang konsisten agar mudah dikonsumsi oleh React frontend.

## Proposed Changes

### Project Structure
```
pengaplikasian-crud-ai/
├── src/
│   ├── index.js              # Entry point Express server
│   ├── routes/
│   │   └── todos.js          # Route definitions
│   ├── controllers/
│   │   └── todosController.js # Business logic CRUD
│   └── data/
│       └── store.js          # In-memory data store
├── package.json
├── .env
└── .gitignore
```

### API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/todos` | Ambil semua todo |
| GET | `/api/todos/:id` | Ambil satu todo |
| POST | `/api/todos` | Buat todo baru |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Hapus todo |

### Response Format (konsisten untuk React)
```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

### Todo Schema
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "completed": false,
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

---

### Dependencies

#### [NEW] package.json
- `express` - web framework
- `cors` - izinkan akses dari React (port berbeda)
- `uuid` - generate unique ID
- `dotenv` - environment variables
- `nodemon` (devDependency) - auto-restart saat development

---

### Source Files

#### [NEW] src/data/store.js
In-memory array sebagai pengganti database sementara.

#### [NEW] src/controllers/todosController.js
Berisi logic CRUD: `getAllTodos`, `getTodoById`, `createTodo`, `updateTodo`, `deleteTodo`.

#### [NEW] src/routes/todos.js
Mount controller ke endpoint `/api/todos`.

#### [NEW] src/index.js
Setup Express app: middleware (cors, json parser), mount routes, start server di port 3000.

#### [NEW] .env
```
PORT=3000
```

#### [NEW] .gitignore
Exclude `node_modules/` dan `.env`.

---

## Verification Plan

### Automated / Manual Test dengan Browser atau curl

Setelah server jalan (`npm run dev`), test endpoint berikut:

1. **GET semua todo**
   ```
   GET http://localhost:3000/api/todos
   ```

2. **POST buat todo baru**
   ```
   POST http://localhost:3000/api/todos
   Body: { "title": "Belajar React", "description": "Buat project todo" }
   ```

3. **PUT update todo**
   ```
   PUT http://localhost:3000/api/todos/:id
   Body: { "completed": true }
   ```

4. **DELETE hapus todo**
   ```
   DELETE http://localhost:3000/api/todos/:id
   ```

Test bisa dilakukan via browser subagent atau menggunakan tool seperti Thunder Client / Postman.
