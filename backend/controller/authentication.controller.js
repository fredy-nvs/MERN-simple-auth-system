const User = require('../model/user.model');

const signUp = async (req, res) => {
	const {name, password, email} = req.body;

	try {
		const user = User.create({name, password, email});
		res.status(201).json({
			message: "User created successfully",
			id: user._id
		});
	} catch (error) {
		console.error('An error occurred during the creation of the user');
		res.status(400).send({error: error});
	}
};

const signIn = async (req, res) => {

};

module.exports = { signUp, signIn };