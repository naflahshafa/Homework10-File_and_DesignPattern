const express = require('express');
const router = express.Router();
const movieRouter = require('./movieRouter');

router.use('/api/movies', movieRouter);

module.exports = router;