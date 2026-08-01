import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Inviamo anche il campo 'name' al backend
      await api.post('/auth/register', { name, email, password });
      alert("Registrazione completata! Ora puoi accedere.");
      navigate('/login');
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      alert("Errore durante la registrazione. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleRegister}>
        <h2>Registrati</h2>
        
        <input 
          type="text" 
          placeholder="Nome completo" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creazione in corso...' : 'Crea account'}
        </button>
        
        <button type="button" className="link-button" onClick={() => navigate('/login')}>
          Hai già un account? Accedi
        </button>
      </form>
    </div>
  );
}

export default Register;
