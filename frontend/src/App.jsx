import { useEffect, useState } from "react";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadTasks() {
    const res = await fetch(`${API}/tasks`);
    const data = await res.json();
    setTasks(data);
  }

  async function addTask(e) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;

    setLoading(true);
    try {
      const res = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: t }),
      });
      if (!res.ok) throw new Error("Create failed");
      setTitle("");
      await loadTasks();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Bài kiểm tra -MSSV- Ca2 </h1>
      <h2>Taskboard 2</h2>

      <form onSubmit={addTask} style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          style={{ flex: 1, padding: 10 }}
        />
        <button disabled={loading} style={{ padding: "10px 14px" }}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <ul style={{ marginTop: 16 }}>
        {tasks.map((t) => (
          <li key={t.id}>
            #{t.id} - {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
