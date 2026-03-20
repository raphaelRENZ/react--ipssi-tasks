
import { useEffect, useState } from "react";
import Header from "../../components/Header";

const PageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const request = await fetch("http://localhost:8000/api/tasks");
        const response = await request.json();

        if (!response.success) {
          setError("Impossible de récupérer les tâches.");
          return;
        }

        setTasks(response.data ?? []);
      } catch (fetchError) {
        setError("Erreur réseau. Vérifie que l'API tourne sur localhost:8000.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main className="page">
        <h1>Mes tâches</h1>

        {loading ? <p>Chargement...</p> : null}
        {error ? <p className="error-box">{error}</p> : null}

        {!loading && !error && tasks.length === 0 ? (
          <p>Aucune tâche pour le moment.</p>
        ) : null}

        {!loading && !error && tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <h2>{task.title}</h2>
                <p>{task.description || "Pas de description"}</p>
                <span className="badge">{task.status}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </main>
    </div>
  );
};

export default PageTasks;
