const User = require('../model/user.model');
const createToken = require("../util/token");

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
	const {email, password} = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user || password !== user.password) {
			return res.status(404).json({ message: "Email or password incorrect" });
		}

		const token = createToken(user._id);

		res.cookie('jwt', token, {httpOnly: true});
		res.status(200).json({
			userId: user._id
		});
	} catch (error) {
		console.error({ error });
	}
};

module.exports = { signUp, signIn };