const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/homePage', authenticate,  )



module.exports = router;