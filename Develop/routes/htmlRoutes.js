const express = require('express');
const router = express.Router();
const path = require('path');

//homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

//exercise page
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

//graphs and tracker
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

module.exports = router;