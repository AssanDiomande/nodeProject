var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');


router.post("/signup",userController.signUp);
router.post("/login",userController.logIn);

module.exports = router;