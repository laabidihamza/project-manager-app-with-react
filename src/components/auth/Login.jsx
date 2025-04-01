// components/auth/Login.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import './Login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Connexion</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;