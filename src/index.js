import "dotenv/config";
import express from "express";
import cors from "cors";
import todosRouter from "./routes/todos.js";

const app = express();
const PORT = process.env.PORT || 3000;

// =====================
//     MIDDLEWARE
// =====================

// CORS - izinkan request dari semua origin (React di port 5173, dll)
app.use(
  cors({
    origin: "https://naunauwf.github.io", // Untuk production, ganti dengan domain React Anda
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// =====================
//       ROUTES
// =====================

// Health check - untuk memastikan server berjalan
app.get("/", function (req, res) {
  res.json({
    success: true,
    message: "🚀 Todo API berjalan dengan baik!",
    endpoints: {
      "GET    /api/todos": "Ambil semua todo",
      "GET    /api/todos/:id": "Ambil satu todo",
      "POST   /api/todos": "Buat todo baru",
      "PUT    /api/todos/:id": "Update todo",
      "DELETE /api/todos/:id": "Hapus todo",
    },
  });
});

// Todo routes
app.use("/api/todos", todosRouter);

// =====================
//   404 HANDLER
// =====================
app.use(function (req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
    data: null,
  });
});

// =====================
//   START SERVER
// =====================
app.listen(PORT, () => {
  console.log("========================================");
  console.log(`🚀  Server berjalan di: http://localhost:${PORT}`);
  console.log(`📋  API Todos       : http://localhost:${PORT}/api/todos`);
  console.log("========================================");
});
