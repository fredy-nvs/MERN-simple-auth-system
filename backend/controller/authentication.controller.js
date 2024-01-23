const User = require('../model/user.model');

const signUp = async (req, res) => {
	const {name, password, email} = req.body;
	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists !== null) {
		return res.status(200).json({
			message: 'This is email is already used'
		});
	}
	try {
		const user = await User.create({name, password, email});
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