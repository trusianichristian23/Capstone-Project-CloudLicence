import { Link } from 'react-router-dom';
import { User, Shield, BarChart3, Layers, ArrowRight } from 'lucide-react';

function Landing() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* Navbar SaaS con il logo a griglia in alto a sinistra */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, backgroundColor: '#0f172a', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Logo a griglia (quattro quadratini) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 8px)', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', border: '2px solid #38bdf8', borderRadius: '2px' }}></div>
            <div style={{ width: '8px', height: '8px', border: '2px solid #38bdf8', borderRadius: '2px' }}></div>
            <div style={{ width: '8px', height: '8px', border: '2px solid #38bdf8', borderRadius: '2px' }}></div>
            <div style={{ width: '8px', height: '8px', border: '2px solid #38bdf8', borderRadius: '2px' }}></div>
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Cloud<span style={{ color: '#38bdf8' }}>Licence</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', border: '1px solid #334155' }}>
            <User size={18} color="#38bdf8" /> Accedi / Registrati
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '20px' }}>
          Ottimizzazione Budget Aziendale
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
          Il futuro della gestione software in azienda.
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '40px', lineHeight: '1.6' }}>
          Elimina gli sprechi di budget SaaS, monitora le scadenze in tempo reale e mantieni il controllo totale del tuo ecosistema IT con lo Stack MERN.
        </p>
        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', backgroundColor: '#38bdf8', color: '#0f172a', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.4)' }}>
          Inizia Subito <ArrowRight size={20} />
        </Link>
      </header>

      {/* Sezione Problema & Soluzione */}
      <section style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ background: '#1e293b', padding: '30px', borderRadius: '16px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '15px', fontSize: '1.3rem' }}>⚠️ Il Problema: SaaS Sprawl</h3>
          <ul style={{ listStyleType: 'none', padding: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
            <li>• <b>Sprechi Economici:</b> Fino al 30% del budget sprecato in licenze inutilizzate.</li>
            <li>• <b>Shadow IT:</b> Difficoltà nel monitorare chi usa cosa e relativi costi.</li>
            <li>• <b>Rinnovi Dimenticati:</b> Pagamenti automatici indesiderati per software obsoleti.</li>
          </ul>
        </div>

        <div style={{ background: '#1e293b', padding: '30px', borderRadius: '16px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#38bdf8', marginBottom: '15px', fontSize: '1.3rem' }}>💡 La Soluzione: Visibilità Totale</h3>
          <ul style={{ listStyleType: 'none', padding: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
            <li>• <b>Analytics Real-time:</b> Dashboard istantanea per monitorare la spesa.</li>
            <li>• <b>Smart Alerts:</b> Notifiche proattive sulle scadenze imminenti.</li>
            <li>• <b>Catalogo Unificato:</b> Unico punto di controllo aziendale.</li>
          </ul>
        </div>
      </section>

      {/* Sezione Tecnologie MERN & Sicurezza */}
      <section style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>Tecnologie e Sicurezza Enterprise</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          
          <div style={{ background: '#1e293b', padding: '25px', borderRadius: '16px', border: '1px solid #334155' }}>
            <Layers color="#38bdf8" size={32} style={{ marginBottom: '15px' }} />
            <h4 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Stack MERN Moderno</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Sviluppato con <b>MongoDB</b>, <b>Express.js</b>, <b>React</b> e <b>Node.js</b> per garantire performance scalabili e reattività istantanea.
            </p>
          </div>

          <div style={{ background: '#1e293b', padding: '25px', borderRadius: '16px', border: '1px solid #334155' }}>
            <Shield color="#38bdf8" size={32} style={{ marginBottom: '15px' }} />
            <h4 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Sicurezza Avanzata</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Protezione dei dati tramite hashing <b>Bcrypt</b>, sessioni stateless con <b>JWT</b> e rotte protette tramite React Router.
            </p>
          </div>

          <div style={{ background: '#1e293b', padding: '25px', borderRadius: '16px', border: '1px solid #334155' }}>
            <BarChart3 color="#38bdf8" size={32} style={{ marginBottom: '15px' }} />
            <h4 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Analytics & Chart.js</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Trasformazione dei costi grezzi in grafici visivi intuitivi per identificare istantaneamente i top spenders aziendali.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid #1e293b', color: '#64748b', fontSize: '0.9rem', marginTop: '40px' }}>
        <p>CloudLicence Team - Full Stack React Developer &copy; 2026</p>
      </footer>

    </div>
  );
}

export default Landing;