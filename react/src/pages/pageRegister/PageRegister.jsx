import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/Header";

const PageRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      setLoading(true);

      const request = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
        }),
      });

      const response = await request.json();

      if (!request.ok || !response.success) {
        setError(response.message ?? "Inscription impossible.");
        return;
      }

      setSuccess("Inscription réussie. Redirection vers la page de connexion...");
      setTimeout(() => navigate("/"), 900);
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
        <h1>Register</h1>

        <form className="form-card" onSubmit={handleRegister}>
          <div className="field">
            <label htmlFor="lastname">Nom</label>
            <input
              id="lastname"
              type="text"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="firstname">Prénom</label>
            <input
              id="firstname"
              type="text"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        {error ? <p className="error-box">{error}</p> : null}
        {success ? <p className="success-box">{success}</p> : null}
      </main>
    </div>
  );
};

export default PageRegister;
