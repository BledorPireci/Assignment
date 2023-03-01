const bcrypt = require('bcryptjs');
const userQuery = require('../services/user.service');
const jwt = require('jsonwebtoken');



module.exports = { authorizeUser };