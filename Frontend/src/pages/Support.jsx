import React from 'react';
import { useNavigate } from 'react-router-dom';

function Support() {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-card" style={{ textAlign: 'center' }}>
        <h2>Supporto Accesso</h2>
        <p style={{ color: '#64748b' }}>
          Per motivi di sicurezza, il reset della password deve essere effettuato da un amministratore di sistema.
        </p>
        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', margin: '10px 0' }}>
          <strong>Contatta l'IT:</strong><br />
          <a href="mailto:admin@cloudLicence.it">admin@cloudLicence.it</a>
        </div>
        <button onClick={() => navigate('/login')} className="link-button" style={{ marginTop: '10px' }}>
          Torna al Login
        </button>
      </div>
    </div>
  );
}
export default Support;