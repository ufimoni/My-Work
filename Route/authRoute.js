const express = require('express');
const authcontroller = require('./../controllers/authcontroller')

const router = express.Router();

//// ('/endpoint_name)
router.route('/signup')
    .post(authcontroller.signup)

module.exports = router;