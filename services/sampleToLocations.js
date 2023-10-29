// DISCLAIMER: GITHUB COPILOT WAS USED TO HELP WITH THIS FILE
// Code may be similiar or copied from my A2 submission for COMP2140.
import utils from '../config/utils';

/**
 * Fetches and returns all samples from a location.
 *
 * @param {String} locationId A unique location id
 * @returns {Promise} Promise object represents the list of samples from a location
 */
const getAllSamplesFromLocation = async locationId => {
	const url = `${utils.BASE_URL}sampletolocation/?api_key=${utils.API_KEY}&location_id=${locationId}`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(
			'Something went wrong when fetching all samples from a location:',
			err
		);
	}
};

export default { getAllSamplesFromLocation };
