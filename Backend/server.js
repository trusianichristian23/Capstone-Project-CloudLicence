// 1. FORZA NODE A USARE I DNS IN MODALITÀ COMPATIBILE
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotta di test iniziale
app.get('/', (req, res) => {
  res.send('Server di CloudLicence funzionante e attivo!');
});

// 📌 COLLEGAMENTO DELLE ROTTE
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/licenses', require('./routes/licenseRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Connessione MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('🚀 Connessione a MongoDB Atlas completata con successo!');
  })
  .catch((err) => {
    console.error('❌ Errore di connessione a MongoDB:', err);
  });

// Avvio server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server avviato sulla porta ${PORT}`);
});