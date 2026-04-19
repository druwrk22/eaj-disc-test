const User = require('../models/User');
const MasterQuestion = require('../models/DiscMaster');
const bcrypt = require('bcryptjs');

// Manage User
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role } = req.body;
        
        await User.update({ name, role }, { where: { id } });
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const defaultPassword = '12345678'; 
        
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        
        await User.update({ password: hashedPassword }, { where: { id } });
        res.json({ message: "Password reset to 12345678 successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Manage Questions
exports.getQuestions = async (req, res) => {
    try {
        const questions = await MasterQuestion.findAll();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createQuestion = async (req, res) => {
    try {
        const { nomor, pilihan_teks, kategori } = req.body;
        const newQuestion = await MasterQuestion.create({ nomor, pilihan_teks, kategori });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const { nomor, pilihan_teks, kategori, original_pilihan_teks } = req.body;
        await MasterQuestion.update(
            { nomor, pilihan_teks, kategori },
            { where: { pilihan_teks: original_pilihan_teks || pilihan_teks } }
        );
        res.json({ message: "Update berhasil" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const { pilihan_teks } = req.params;
        await MasterQuestion.destroy({ where: { pilihan_teks } });
        res.json({ message: "Data berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};