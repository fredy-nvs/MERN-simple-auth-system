const mongoose = require('mongoose');

mongoose
	.connect('mongodb+srv://fredy-nvs:bGXq2v3cVupTMFsI@cluster0.lnkzbxi.mongodb.net/?retryWrites=true&w=majority')
	.then(
		() => console.log('Successfully connected to MongoDB Atlas!')
	).catch(
		(error) => console.log('Error : ' + error.message)
);