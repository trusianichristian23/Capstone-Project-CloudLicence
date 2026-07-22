const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Creazione utente (con ereditarietà automatica del companyId dell'admin)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        let userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'Utente già esistente' });

        const newUser = new User({
            name,
            email,
            password,
            role: role || 'user',
            companyId: req.user.companyId 
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        
        await newUser.save();
        res.status(201).json({ msg: 'Utente creato correttamente nell\'azienda.' });
    } catch (err) {
        res.status(500).json({ msg: 'Errore del server' });
    }
};

// --- FUNZIONI ESISTENTI (MANTENUTE) ---

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ companyId: req.user.companyId });
        res.json(users);
    } catch (err) { res.status(500).json({ msg: 'Errore del server' }); }
};

exports.updateSettings = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true });
        res.json(updated);
    } catch (err) { res.status(500).json({ msg: 'Errore del server' }); }
};

exports.updateProfile = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true });
        res.json(updated);
    } catch (err) { res.status(500).json({ msg: 'Errore del server' }); }
};

exports.updateUserRole = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
        res.json(updated);
    } catch (err) { res.status(500).json({ msg: 'Errore del server' }); }
};