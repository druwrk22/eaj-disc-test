// models/UserResponse.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserResponse = sequelize.define('user_responses', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    user_id: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    nomor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pilihan_paling: {
        type: DataTypes.TEXT,  
        allowNull: false
    },
    pilihan_kurang: {
        type: DataTypes.TEXT, 
        allowNull: false
    }
}, { 
    tableName: 'user_responses', 
    timestamps: false,  
    indexes: [
        {
            fields: ['user_id'],  
            name: 'idx_user_responses_user_id'
        },
        {
            fields: ['user_id', 'nomor'], 
            unique: true,
            name: 'uniq_user_nomor'
        }
    ]
});

module.exports = UserResponse;