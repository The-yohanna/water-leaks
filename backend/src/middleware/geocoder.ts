import nodeGeocoder from 'node-geocoder';

const options = {
	provider: 'openstreetmap',
	formatter: null,
};

const geoCoder = nodeGeocoder(options);

const geocoder = async (
	location: string,
) => {
	const geocode = await geoCoder.geocode(location);
	return geocode[0];
};

export default geocoder;
