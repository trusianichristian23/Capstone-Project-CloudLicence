import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error("Errore nel recupero utenti:", err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/create', { ...newUser, role: 'user' });
      alert("Utente creato con successo!");
      setNewUser({ name: '', email: '', password: '' });
      fetchUsers();
    } catch (err) {
      alert("Errore nella creazione dell'utente.");
    }
  };

  const updateRole = async (userId, newRole) => {
    try {
      await api.put(`/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      alert("Errore nell'aggiornamento del ruolo.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div style={{ padding: '24px' }}>Caricamento in corso...</div>;

  return (
    <div className="dashboard-content">
      <h2 style={{ marginBottom: '24px', color: '#1e293b' }}>Gestione Team</h2>

      {/* Form Aggiunta Utente Professionale */}
      <div style={{ 
        background: '#fff', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
        marginBottom: '30px',
        border: '1px solid #e2e8f0' 
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.1rem', color: '#1e293b' }}>
          Aggiungi un nuovo dipendente
        </h3>
        <form onSubmit={createUser} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Nome" 
            value={newUser.name} 
            onChange={e => setNewUser({...newUser, name: e.target.value})} 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1 }}
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={newUser.email} 
            onChange={e => setNewUser({...newUser, email: e.target.value})} 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1 }}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={newUser.password} 
            onChange={e => setNewUser({...newUser, password: e.target.value})} 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1 }}
            required 
          />
          <button type="submit" style={{ 
            padding: '10px 20px', 
            background: '#0f172a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            fontWeight: '600' 
          }}>
            Crea Utente
          </button>
        </form>
      </div>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr><th>Nome</th><th>Email</th><th>Ruolo</th><th>Iscrizione</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select 
                    value={user.role} 
                    onChange={(e) => updateRole(user._id, e.target.value)}
                    style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="user">USER</option>
                    <option value="admin">ADMIN</option>
                  </select>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;