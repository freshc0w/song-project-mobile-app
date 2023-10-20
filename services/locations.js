import utils from '../config/utils';

const getLocations = async () => {
	const url = `${utils.BASE_URL}location/?api_key=${utils.API_KEY}`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error('Something went wrong when getting location lists:', err);
	}
};

export default { getLocations };
