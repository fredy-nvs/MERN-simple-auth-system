const express = require('express');
const { signUp } = require("../controller/authentication.controller");
const router = express.Router();

router.post('/register', signUp);

module.exports = router;