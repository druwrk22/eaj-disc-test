const DiscMaster = require('../models/DiscMaster');
const UserResponse = require('../models/UserResponse');

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