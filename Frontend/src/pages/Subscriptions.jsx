import { useEffect, useState } from 'react';
import { Trash2, Edit2, RefreshCw, Search } from 'lucide-react';
import api from '../api/axiosConfig';
import AddLicenseModal from '../components/AddLicenseModal';

function Subscriptions() {
  const [licenses, setLicenses] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLicense, setEditingLicense] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'expiresAt', direction: 'asc' });
  const [selectedLicenses, setSelectedLicenses] = useState([]);

  const loadLicenses = async () => {
    try {
      const res = await api.get('/licenses/my-licenses');
      setLicenses(res.data);
    } catch (err) {
      console.error("Errore caricamento:", err);
    }
  };

  useEffect(() => {
    loadLicenses();
  }, []);

  const getStatusInfo = (lic) => {
    const now = new Date();
    const expiry = new Date(lic.expiresAt);
    if (expiry < now) return { label: 'Scaduto', color: '#ef4444', class: 'expired' };
    if (expiry - now < 10 * 24 * 60 * 60 * 1000) return { label: 'In scadenza', color: '#f59e0b', class: 'expiring' };
    return { label: 'Attivo', color: '#166534', class: 'active' };
  };

  const getDaysLeft = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const toggleSelectAll = () => {
    if (selectedLicenses.length === filteredAndSortedLicenses.length) setSelectedLicenses([]);
    else setSelectedLicenses(filteredAndSortedLicenses.map(l => l._id));
  };

  const toggleSelect = (id) => {
    setSelectedLicenses(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Eliminare le ${selectedLicenses.length} licenze selezionate?`)) return;
    try {
      await Promise.all(selectedLicenses.map(id => api.delete(`/licenses/${id}`)));
      setSelectedLicenses([]);
      loadLicenses();
    } catch (err) { alert("Errore durante l'eliminazione multipla."); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa licenza?")) {
      try {
        await api.delete(`/licenses/${id}`);
        loadLicenses();
      } catch (err) { alert("Errore durante l'eliminazione."); }
    }
  };

  const handleRenew = async (lic) => {
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() + 1);
    try {
      await api.put(`/licenses/${lic._id}`, { expiresAt: newDate.toISOString() });
      loadLicenses();
    } catch (err) { alert("Errore durante il rinnovo."); }
  };

  const toggleSort = () => {
    setSortConfig(prev => ({ key: 'expiresAt', direction: prev.direction === 'asc' ? 'desc' : 'asc' }));
  };

  const filteredAndSortedLicenses = [...licenses]
    .filter(lic => {
      const matchesStatus = filterStatus === 'all' || getStatusInfo(lic).class === filterStatus;
      const matchesSearch = lic.softwareName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a[sortConfig.key]);
      const dateB = new Date(b[sortConfig.key]);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="dashboard-content" style={{ padding: '24px' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0' }}>Totale Licenze</p>
          <h3 style={{ fontSize: '1.5rem', margin: '5px 0 0 0' }}>{licenses.length}</h3>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0' }}>In Scadenza</p>
          <h3 style={{ fontSize: '1.5rem', margin: '5px 0 0 0', color: '#f59e0b' }}>{licenses.filter(l => getStatusInfo(l).class === 'expiring').length}</h3>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0' }}>Scadute</p>
          <h3 style={{ fontSize: '1.5rem', margin: '5px 0 0 0', color: '#ef4444' }}>{licenses.filter(l => getStatusInfo(l).class === 'expired').length}</h3>
        </div>
      </div>

      {selectedLicenses.length > 0 && (
        <div style={{ background: '#f8fafc', padding: '12px 20px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: '600', color: '#475569' }}>{selectedLicenses.length} selezionati</span>
          <button onClick={handleBulkDelete} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>Elimina Selezionati</button>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#1e293b' }}>Gestione Abbonamenti</h2>
        <input 
            type="text" 
            placeholder="Cerca..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ 
                padding: '10px 12px', 
                borderRadius: '10px', 
                border: '1px solid black', 
                width: '300px' 
            }} 
        />
      </div>

      <div className="table-container">
        <table className="styled-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}><input type="checkbox" onChange={toggleSelectAll} checked={selectedLicenses.length > 0 && selectedLicenses.length === filteredAndSortedLicenses.length} /></th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Software</th>
              <th style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }} onClick={toggleSort}>Scadenza {sortConfig.direction === 'asc' ? '▲' : '▼'}</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Stato</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedLicenses.length > 0 ? (
              filteredAndSortedLicenses.map(lic => {
                const statusInfo = getStatusInfo(lic);
                const daysLeft = getDaysLeft(lic.expiresAt);
                return (
                  <tr key={lic._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px' }}><input type="checkbox" checked={selectedLicenses.includes(lic._id)} onChange={() => toggleSelect(lic._id)} /></td>
                    <td style={{ padding: '12px' }}>{lic.softwareName}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: '500' }}>{new Date(lic.expiresAt).toLocaleDateString()}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {daysLeft > 0 ? `Scade tra ${daysLeft} giorni` : daysLeft === 0 ? "Scade oggi!" : `Scaduta da ${Math.abs(daysLeft)} giorni`}
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}><span className={`badge ${statusInfo.class}`} style={{ padding: '4px 8px', borderRadius: '4px', background: statusInfo.color + '20', color: statusInfo.color }}>{statusInfo.label}</span></td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button title="Modifica" onClick={() => { setEditingLicense(lic); setIsModalOpen(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={16} /></button>
                      <button title="Rinnova" onClick={() => handleRenew(lic)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px', color: '#059669' }}><RefreshCw size={16} /></button>
                      <button title="Elimina" onClick={() => handleDelete(lic._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px', color: '#ef4444' }}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '1rem' }}>
                  Nessuna licenza trovata con i filtri attuali.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddLicenseModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingLicense(null); }} onAdd={loadLicenses} licenseToEdit={editingLicense} />
    </div>
  );
}

export default Subscriptions;
