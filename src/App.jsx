// App.js
import { useState, useEffect } from 'react';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading-screen">Chargement...</div>;
  }

  return (
    <div className="app">
      {user ? <Dashboard user={user} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;