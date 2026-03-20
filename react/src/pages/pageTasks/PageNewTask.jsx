import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/Header";

const PageNewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateTask = async (event) => {
    event.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }

    try {
      setLoading(true);

      const request = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status,
        }),
      });

      const response = await request.json();

      if (!request.ok || !response.success) {
        setError(response.message ?? "Création impossible.");
        return;
      }

      navigate("/tasks");
    } catch {
      setError("Erreur réseau. Vérifie que l'API tourne sur localhost:8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="page">
        <h1>Nouvelle task</h1>

        <form className="form-card" onSubmit={handleCreateTask}>
          <div className="field">
            <label htmlFor="title">Titre</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
            />
          </div>

          <div className="field">
            <label htmlFor="status">Statut</label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="pending">pending</option>
              <option value="in_progress">in_progress</option>
              <option value="completed">completed</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Création..." : "Créer la task"}
          </button>
        </form>

        {error ? <p className="error-box">{error}</p> : null}
      </main>
    </div>
  );
};

export default PageNewTask;
