/* eslint-disable consistent-return */
import geocoder from '../middleware/geocoder.js';
import LeakLocation from '../models/leakLocation.js';

import express from 'express';

const router = express.Router();

router.post('/', async (req, res, next) => {
	try {
		const {
			location,
		} = req.body;
		const geocode = await geocoder(location);

		const leakLocation = new LeakLocation({
			latitude: geocode.latitude,
			longitude: geocode.longitude,
			formattedAddress: geocode.formattedAddress,
			zipcode: geocode.zipcode,
		});

		leakLocation.save((err) => (err ? res.send(err) : res.status(200).send(leakLocation)));
	} catch (err) {
		return next(err);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const leaks = await LeakLocation.find().exec();
		res.status(200).send(leaks);
	} catch (err) {
		return next(err);
	}
});

router.delete('/', async (req, res, next) => {
	try {
		await LeakLocation.deleteMany().exec();
		res.status(200).send(`Successfully deleted all leak locations`);
	} catch (err) {
		return next(err);
	}
});

export default router;
