// In-memory data store (pengganti database sementara)
// Data akan hilang saat server di-restart
// Untuk production: ganti dengan MySQL / MongoDB

let todos = [
  {
    id: "1",
    title: "Belajar Express.js",
    description: "Membuat REST API dengan Express.js",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Belajar React.js",
    description: "Membuat frontend dengan React.js dan Axios",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default todos;
