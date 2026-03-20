import NavLink from "./NavLink";

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink path="/">Accueil</NavLink>
        <NavLink path="/register">Register</NavLink>
        <NavLink path="/tasks">Voir les tâches en cours</NavLink>
        <NavLink path="/nouvelle-task">Nouvelle Task</NavLink>
      </nav>
    </header>
  );
};

export default Header;
