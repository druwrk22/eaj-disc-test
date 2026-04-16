const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DiscMaster = sequelize.define('disc_master', {
    nomor: { type: DataTypes.INTEGER, primaryKey: true },
    pilihan_teks: { type: DataTypes.STRING, primaryKey: true },
    kategori: DataTypes.STRING
}, { tableName: 'disc_master', timestamps: false });

module.exports = DiscMaster;