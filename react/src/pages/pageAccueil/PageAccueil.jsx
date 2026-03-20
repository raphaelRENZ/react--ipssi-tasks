import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/Header";
import { JwtContext } from "../../contexts/JwtContext";

const PageAccueil = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setJwt } = useContext(JwtContext);
  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    if (email === "") {
      setError("Merci de saisir votre email");
      return;
    }

    if (password === "") {
      setError("Merci de saisir votre mot de passe");
      return;
    }

    if (password.length < 6) {
      setError("Pas assez de caractères a votre MDP !");
      return;
    }

    try {
      setLoading(true);

      const request = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const response = await request.json();

      if (response.code === 401) {
        setError("Il y a un problème avec votre email / votre mot de passe :(");
        return;
      }

      if (!response.token) {
        setError("Impossible de se connecter pour le moment.");
        return;
      }

      setJwt(response.token);
      navigate("/tasks");
    } catch (error) {
      setError("Erreur réseau. Vérifie que l'API tourne sur localhost:8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="page">
        <h1>Connexion</h1>

        <form className="form-card" onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChangePassword}
              value={password}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {error !== null ? <p className="error-box">{error}</p> : null}
      </main>
    </div>
  );
};

export default PageAccueil;
