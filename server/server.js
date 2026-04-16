// server/server.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('eaj_disc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const DiscMaster = sequelize.define('disc_master', {
    nomor: { type: DataTypes.INTEGER, primaryKey: true },
    pilihan_teks: { type: DataTypes.STRING, primaryKey: true },
    kategori: DataTypes.STRING
}, { tableName: 'disc_master', timestamps: false });

const UserResponse = sequelize.define('user_responses', {
    nomor: DataTypes.INTEGER,
    pilihan_paling: DataTypes.STRING,
    pilihan_kurang: DataTypes.STRING
}, { tableName: 'user_responses', timestamps: false });

sequelize.sync();

// 1. Ambil soal berdasarkan nomor
app.get('/questions/:no', async (req, res) => {
    const data = await DiscMaster.findAll({ where: { nomor: req.params.no } });
    res.json(data);
});

// 2. Simpan jawaban
app.post('/submit-answer', async (req, res) => {
    const { nomor, paling, kurang } = req.body;
    // Update jika sudah ada, atau create baru (Upsert)
    await UserResponse.destroy({ where: { nomor } }); 
    const save = await UserResponse.create({
        nomor, pilihan_paling: paling, pilihan_kurang: kurang
    });
    res.json({ status: 'success', data: save });
});

app.listen(3000, () => console.log('Server running on port 3000'));