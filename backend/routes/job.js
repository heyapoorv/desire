const express = require('express');
const router = express.Router();
const { addJob, getAllJobs } = require('../controllers/jobController');

router.post('/add', addJob);
router.get('/', getAllJobs);

module.exports = router;
