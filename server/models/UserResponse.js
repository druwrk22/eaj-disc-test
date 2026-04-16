const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserResponse = sequelize.define('user_responses', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nomor: DataTypes.INTEGER, 
    pilihan_paling: DataTypes.STRING,
    pilihan_kurang: DataTypes.STRING
}, { tableName: 'user_responses', timestamps: false });

module.exports = UserResponse;