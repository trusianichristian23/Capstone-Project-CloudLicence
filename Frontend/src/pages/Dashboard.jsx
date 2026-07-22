import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../api/axiosConfig';
import LicenseChart from '../components/LicenseChart';
import AddLicenseModal from '../components/AddLicenseModal';

function Dashboard() {
  const [stats, setStats] = useState({ totalMonthly: 0, activeLicenses: 0, totalLicenses: 0 });
  const [licenses, setLicenses] = useState([]);
  const [expiring, setExpiring] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async () => {
    try {
      // Uso Promise.all per caricare tutto in parallelo e velocizzare la UI
      const [resStats, resLic, resExp] = await Promise.all([
        api.get('/licenses/stats'),
        api.get('/licenses/my-licenses'),
        api.get('/licenses/expiring')
      ]);
      setStats(resStats.data);
      setLicenses(resLic.data);
      setExpiring(resExp.data);
    } catch (err) {
      console.error("Errore caricamento dati:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa licenza?")) {
      try {
        await api.delete(`/licenses/${id}`);
        loadData(); // Ricarica i dati dopo l'eliminazione
      } catch (err) {
        alert("Errore durante l'eliminazione");
      }
    }
  };

  return (
    <div className="dashboard-content">
      {/* Header con pulsante di aggiunta */}
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1>Dashboard</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '10px 20px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Aggiungi Licenza
        </button>
      </div>

      {/* Notifiche Scadenze */}
      {expiring && expiring.length > 0 && (
        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '20px', borderRadius: '12px', marginBottom: '20px', color: '#991b1b' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>⚠️ Attenzione: {expiring.length} Licenze in scadenza</h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {expiring.map((l, i) => (
              <li key={i}><strong>{l.softwareName}</strong> - Scade il {new Date(l.expiresAt).toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      )}

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card"><h3>Spesa Mensile</h3><p>€{stats.totalMonthly}</p></div>
        <div className="kpi-card"><h3>Licenze Attive</h3><p>{stats.activeLicenses}</p></div>
        <div className="kpi-card"><h3>Totale App</h3><p>{stats.totalLicenses}</p></div>
      </div>

      <LicenseChart data={licenses} />

      {/* Tabella Licenze */}
      <div className="table-container">
        <h3>Applicazioni in Uso</h3>
        <table className="styled-table">
          <thead>
            <tr><th>Software</th><th>Categoria</th><th>Costo</th><th>Stato</th><th>Azioni</th></tr>
          </thead>
          <tbody>
            {licenses.map(lic => {
              const isExpired = new Date(lic.expiresAt) < new Date();
              return (
                <tr key={lic._id} className={isExpired ? 'tr-expiring' : ''}>
                  <td>{lic.softwareName}</td>
                  <td>{lic.category}</td>
                  <td>€{lic.cost}</td>
                  <td>
                    <span className={`badge ${isExpired ? 'expired' : 'active'}`}>
                      {isExpired ? "Scaduto" : "Attivo"}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(lic._id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                      <Trash2 size={18} color="red" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modale Aggiunta Licenza */}
      <AddLicenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={loadData}
      />
    </div>
  );
}

export default Dashboard;