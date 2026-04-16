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
        const { nomor, paling, kurang } = req.body;
        // Logic Upsert (Delete then Create)
        await UserResponse.destroy({ where: { nomor } }); 
        const save = await UserResponse.create({
            nomor, 
            pilihan_paling: paling, 
            pilihan_kurang: kurang
        });
        res.json({ status: 'success', data: save });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};