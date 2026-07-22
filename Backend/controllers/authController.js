const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Questo utente esiste già' });
    
    // Se il ruolo non è specificato, impostiamo 'admin' di default per la registrazione di nuove aziende
    const userRole = role || 'admin';
    
    user = new User({ 
      name, 
      email, 
      password, 
      role: userRole 
    });
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    // Salviamo per ottenere l'_id dal database
    await user.save();
    
    // Se è admin, assegniamo il suo ID come companyId per la sua nuova azienda
    if (userRole === 'admin') {
      user.companyId = user._id;
      await user.save();
    }

    res.status(201).json({ msg: 'Utente registrato con successo!' });
  } catch (err) {
    res.status(500).json({ msg: 'Errore del server' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenziali non valide' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenziali non valide' });

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
        companyId: user.companyId
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.json({ 
        token, 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role, 
          companyId: user.companyId 
        } 
      });
    });
  } catch (err) {
    res.status(500).json({ msg: 'Errore del server' });
  }
};