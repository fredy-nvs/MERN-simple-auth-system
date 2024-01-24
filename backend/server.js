const express = require('express');
const app = express();
require('./config/database');
require('dotenv').config({ path:"./config/.env" });
const cors = require('cors');
const authenticationRouter = require('./routes/authentication.routes');

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

app.use('/api', authenticationRouter);

app.listen(port, () => {
	console.log('App listen on port ' + port);
})