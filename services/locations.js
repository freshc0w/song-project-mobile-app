// DISCLAIMER: Code may be similiar or copied from my A2 submission for COMP2140.
import utils from '../config/utils';

/**
 * Fetches all the locations from the specified api.
 *
 * @returns {Promise} Promise object represents the list of locations
 */
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
