const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const user = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 60,
		trim: true
	},
	email: {
		type: String,
		required: true,
		validate: [isEmail],
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		max: 255,
		minLength: 8
	}
}, {
	timeStamps: true}
);

user.pre("save", async (next) => {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(salt, 10);
	next();
});

user.statics.login = async (email, password) => {
	const user = await this.findOne(email);

	if (user) {
		let passwordMatched = user.password === password;
		if (passwordMatched) {
			return user;
		}
		throw new Error('Email or password incorrect');
	}
	throw new Error('Email or password incorrect');
}

module.exports = mongoose.model('User', user);