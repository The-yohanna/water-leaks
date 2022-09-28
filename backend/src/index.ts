import LeakLocation from './models/leakLocation.js';
import leakRoute from './routes/leak.js';
import log from './log.js';

import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import {
	Server,
} from 'socket.io';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: [
			'http://localhost:3000',
		],
	},
});

io.on('connection', (socket) => {
	log.info('User connected');
	socket.on('disconnect', () => {
		log.info('User disconnected');
	});
});

mongoose.connect(process.env.MONGODB_URI)
	.then(() => {
		log.info('DB connected successfully');
	}).catch((err) => {
		log.error('Connection error', err);
		process.exit();
	});

app.use('/leaks', leakRoute);

LeakLocation.watch().on('change', (next) => {
	const location: any = {};
	// eslint-disable-next-line no-restricted-syntax
	for (const [
		key,
		value,
	] of Object.entries(next)) {
		if (key === 'fullDocument') {
			Object.assign(location, value);
		}
	}
	io.emit('newleak', location);
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
	log.info(`Server is running on port ${PORT}`);
});
