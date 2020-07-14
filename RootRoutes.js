const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send('Welcome to my New and improved bike maintenance application');
})

module.exports = router;