const express = require('express');
const router = express.Router();
const discController = require('../controllers/discController');

router.get('/questions/:no', discController.getQuestionsByNo);
router.get('/result/:userId', discController.getResultsById);
router.get('/master-questions', discController.getMasterQuestions);
router.post('/submit-answer', discController.submitAnswer);

module.exports = router;