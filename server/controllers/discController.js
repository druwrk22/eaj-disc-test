const DiscMaster = require('../models/DiscMaster');
const UserResponse = require('../models/UserResponse');
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');

exports.getQuestionsByNo = async (req, res) => {
    try {
        const data = await DiscMaster.findAll({ where: { nomor: req.params.no } });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.submitAnswer = async (req, res) => {
    try {
        const { nomor, paling, kurang, user_id } = req.body;

        if (!user_id) {
            return res.status(401).json({ message: 'User tidak terautentikasi' });
        }

        await UserResponse.destroy({ 
            where: { 
                nomor,
                user_id
            } 
        }); 

        const save = await UserResponse.create({
            nomor, 
            user_id,
            pilihan_paling: paling, 
            pilihan_kurang: kurang
        });
        res.json({ status: 'success', data: save });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getResultsById = async (req, res) => {
  try {
    const { userId } = req.params;
    const responses = await UserResponse.findAll({ where: { user_id: userId } });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMasterQuestions = async(req, res) => {
    try {
        const masters = await DiscMaster.findAll();
        res.json(masters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.submitChangePassword = async (req, res) => {
    try {
        const { email, current_password, new_password, new_password_confirmation } = req.body;

        if (!email || !current_password || !new_password) {
            return res.status(400).json({ message: 'Semua field harus diisi' });
        }

        if (new_password !== new_password_confirmation) {
            return res.status(400).json({ message: 'Konfirmasi password baru tidak cocok' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        const isMatch = await bcrypt.compare(current_password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password saat ini salah' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ status: 'success', message: 'Password berhasil diperbarui' });

    } catch (error) {
        console.error('Error Change Password:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};