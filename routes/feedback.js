const express = require('express');
const router = express.Router();
const { createFeedback, getFeedback } = require('../controllers/feedbackController');

router.get('/', getFeedback);
router.post('/', createFeedback);

module.exports = router;
