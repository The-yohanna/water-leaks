import mongoose from 'mongoose';

const {
	Schema,
} = mongoose;

const date = new Date().toLocaleString('en-GB', {
	timeZone: 'Africa/Nairobi',
});

const leakLocationSchema = new Schema({
	latitude: {
		type: Number,
	},
	longitude: {
		type: Number,
	},
	formattedAddress: {
		type: String,
	},
	zipcode: {
		type: Number,
	},
	time: {
		type: String,
		default: date,
	},
});

const LeakLocation = mongoose.model('LeakLocation', leakLocationSchema);

export default LeakLocation;
