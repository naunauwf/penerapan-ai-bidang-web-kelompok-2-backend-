import { v4 as uuidv4 } from "uuid";
import todos from "../data/store.js";

// Helper: format response yang konsisten untuk React frontend
function sendResponse(res, statusCode, success, message, data = null) {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
}

// GET /api/todos - Ambil semua todo
function getAllTodos(req, res) {
  try {
    sendResponse(res, 200, true, "Berhasil mengambil semua todo", todos);
  } catch (error) {
    sendResponse(res, 500, false, "Terjadi kesalahan server", null);
  }
}

// GET /api/todos/:id - Ambil satu todo berdasarkan ID
function getTodoById(req, res) {
  try {
    const { id } = req.params;
    const todo = todos.find(function (t) {
      return t.id === id;
    });

    if (!todo) {
      return sendResponse(
        res,
        404,
        false,
        `Todo dengan ID ${id} tidak ditemukan`,
        null,
      );
    }

    sendResponse(res, 200, true, "Berhasil mengambil todo", todo);
  } catch (error) {
    sendResponse(res, 500, false, "Terjadi kesalahan server", null);
  }
}

// POST /api/todos - Buat todo baru
function createTodo(req, res) {
  try {
    const { title, description } = req.body;

    // Validasi: title wajib diisi
    if (!title || title.trim() === "") {
      return sendResponse(res, 400, false, "Field 'title' wajib diisi", null);
    }

    const newTodo = {
      id: uuidv4(),
      title: title.trim(),
      description: description ? description.trim() : "",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    sendResponse(res, 201, true, "Todo berhasil dibuat", newTodo);
  } catch (error) {
    sendResponse(res, 500, false, "Terjadi kesalahan server", null);
  }
}

// PUT /api/todos/:id - Update todo
function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const index = todos.findIndex(function (t) {
      return t.id === id;
    });

    if (index === -1) {
      return sendResponse(
        res,
        404,
        false,
        `Todo dengan ID ${id} tidak ditemukan`,
        null,
      );
    }

    // Update hanya field yang dikirim (partial update)
    if (title !== undefined) todos[index].title = title.trim();
    if (description !== undefined)
      todos[index].description = description.trim();
    if (completed !== undefined) todos[index].completed = Boolean(completed);
    todos[index].updatedAt = new Date().toISOString();

    sendResponse(res, 200, true, "Todo berhasil diupdate", todos[index]);
  } catch (error) {
    sendResponse(res, 500, false, "Terjadi kesalahan server", null);
  }
}

// DELETE /api/todos/:id - Hapus todo
function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const index = todos.findIndex(function (t) {
      return t.id === id;
    });

    if (index === -1) {
      return sendResponse(
        res,
        404,
        false,
        `Todo dengan ID ${id} tidak ditemukan`,
        null,
      );
    }

    const deleted = todos.splice(index, 1)[0];
    sendResponse(res, 200, true, "Todo berhasil dihapus", deleted);
  } catch (error) {
    sendResponse(res, 500, false, "Terjadi kesalahan server", null);
  }
}

export { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
