// components/layout/Header.jsx
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import './layout.css';

const Header = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    window.location.reload();
    // En production, vous géreriez cela via un état global
    // plutôt que de recharger la page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Gestion de Projets</h1>
        <div className="user-section">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="logout-button">
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;