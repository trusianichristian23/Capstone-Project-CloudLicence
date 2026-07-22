import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import api from '../api/axiosConfig';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Salvataggio di token e ruolo come inviati dal backend
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      
      navigate('/'); 
      window.location.reload();
    } catch (error) {
      alert("Credenziali non valide");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-logo">
          <LayoutGrid size={48} color="#38bdf8" />
        </div>
        
        <h2>
          Accedi a <span style={{ color: '#38bdf8' }}>Cloud</span>Licence
        </h2>
        
        <input type="email" placeholder="Email aziendale" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <button type="submit">Accedi</button>
        <button type="button" className="link-button" onClick={() => navigate('/register')}>
          Non hai un account? Registrati
        </button>
        <button type="button" className="link-button" onClick={() => navigate('/support')}>
          Hai dimenticato la password?
        </button>
      </form>
    </div>
  );
}

export default Login;