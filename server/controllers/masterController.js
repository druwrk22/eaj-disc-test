const User = require('../models/User');
const bcrypt = require('bcryptjs');

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