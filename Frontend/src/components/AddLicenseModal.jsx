import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

function AddLicenseModal({ isOpen, onClose, onAdd, licenseToEdit }) {
  const initialForm = { 
    softwareName: '', category: 'Design', cost: '', status: 'active',
    expiresAt: '', billingCycle: 'monthly'
  };
  
  const [formData, setFormData] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [newCat, setNewCat] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (licenseToEdit) {
        setFormData({
          ...licenseToEdit,
          expiresAt: licenseToEdit.expiresAt ? licenseToEdit.expiresAt.split('T')[0] : ''
        });
      } else {
        setFormData(initialForm);
        setNewCat('');
      }
    }
  }, [isOpen, licenseToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const finalData = { ...formData, category: newCat || formData.category };
    
    try {
      if (licenseToEdit) {
        await api.put(`/licenses/${licenseToEdit._id}`, finalData);
        alert("✅ Licenza aggiornata!");
      } else {
        await api.post('/licenses/add', finalData);
        alert("✅ Licenza aggiunta!");
      }
      onAdd(); 
      onClose();
    } catch (err) { 
      alert("❌ Errore nel salvataggio"); 
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '16px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <h3 style={{ marginBottom: '20px' }}>{licenseToEdit ? 'Modifica Licenza' : 'Aggiungi Licenza'}</h3>
        
        <input type="text" value={formData.softwareName} onChange={e => setFormData({...formData, softwareName: e.target.value})} placeholder="Nome Software" style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc' }} required disabled={isSaving} />
        <input type="date" value={formData.expiresAt} onChange={e => setFormData({...formData, expiresAt: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc' }} required disabled={isSaving} />
        
        <label style={{ fontSize: '12px', color: '#666' }}>Categoria:</label>
        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '5px', borderRadius: '6px', border: '1px solid #ccc' }} disabled={isSaving}>
          <option value="Design">Design</option>
          <option value="Sviluppo">Sviluppo</option>
          <option value="Marketing">Marketing</option>
          <option value="Produttività">Produttività</option>
        </select>
        
        <input type="text" placeholder="Oppure scrivi nuova categoria" onChange={e => setNewCat(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc' }} disabled={isSaving} />
        
        <input type="number" value={formData.cost} onChange={e => setFormData({...formData, cost: e.target.value})} placeholder="Costo (€)" style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ccc' }} required disabled={isSaving} />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={onClose} disabled={isSaving} style={{ flex: 1, padding: '12px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
            Annulla
          </button>
          <button type="submit" disabled={isSaving} style={{ flex: 2, padding: '12px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            {isSaving ? 'Salvataggio...' : 'Salva Licenza'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLicenseModal;