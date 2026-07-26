import { useState } from 'react';
import api from '../api/axiosConfig';

function Settings() {
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);

  const saveSettings = async () => {
    setLoading(true);
    try {
      await api.put('/users/settings', { notificationDays: days });
      alert("Impostazioni salvate con successo!");
    } catch (err) { 
      alert(err.response?.data?.msg || "Errore nel salvataggio."); 
    } finally { 
      setLoading(false); 
    }
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
    </div>
  );
}

export default Settings;
