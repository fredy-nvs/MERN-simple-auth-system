const express = require('express');
const app = express();
require('./config/database');
const cors = require('cors');

app.use(express.json());

app.use(cors({
	origin: ['*'],
	methods: ['GET', 'POST'],
	credentials: true
}));

const normalizePort = (specifiedPort) => {
	const port = parseInt(specifiedPort, 10);
	if (isNaN(port)) {
		return specifiedPort;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};

const port = normalizePort(process.env.PORT || '5000');

app.listen(port, () => {
	console.log('App listen on port ' + port);
})