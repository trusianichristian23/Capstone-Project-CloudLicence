import { useState } from 'react';
import api from '../api/axiosConfig';

function Settings() {
  const [days, setDays] = useState(7);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const saveSettings = async () => {
    setLoading(true);
    try {
      await api.put('/users/settings', { notificationDays: days });
      alert("Impostazioni salvate con successo!");
    } catch (err) { alert("Errore nel salvataggio."); }
    finally { setLoading(false); }
  };

  const updateProfile = async () => {
    try {
      await api.put('/users/update-profile', { email, password, newPassword });
      alert("Credenziali aggiornate!");
    } catch (err) { alert(err.response?.data?.error || "Errore"); }
  };

  return (
    <div className="settings-container">
      <h2>Impostazioni Profilo</h2>
      
      <div className="settings-card">
        <h3>Notifiche Scadenza</h3>
        <p className="description">Configura con quanti giorni di anticipo desideri ricevere l'avviso di scadenza.</p>
        <div className="form-group">
          <label>Giorni di anticipo:</label>
          <input type="number" value={days} onChange={(e) => setDays(e.target.value)} />
          <button onClick={saveSettings} className="btn-primary" disabled={loading}>Salva Preferenze</button>
        </div>
      </div>

      <div className="settings-card">
        <h3>Modifica Credenziali</h3>
        <div className="form-group">
          <input placeholder="Nuova Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password Attuale" onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Nuova Password" onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={updateProfile} className="btn-primary">Salva Credenziali</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;