const jwt = require('jsonwebtoken');

const createToken = (id) => {
	return jwt.sign({id}, process.env.TOKEN, { expiresIn: maxAge });
};

module.exports = createToken;