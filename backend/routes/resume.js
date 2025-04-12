const express = require('express');
const router = express.Router();
const { uploadResume, parseResume } = require('../controllers/resumeController');

router.post('/upload', uploadResume);
router.post('/parse', parseResume);

module.exports = router;
