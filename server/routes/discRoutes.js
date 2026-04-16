const express = require('express');
const router = express.Router();
const discController = require('../controllers/discController');

router.get('/questions/:no', discController.getQuestionsByNo);
router.post('/submit-answer', discController.submitAnswer);

module.exports = router;