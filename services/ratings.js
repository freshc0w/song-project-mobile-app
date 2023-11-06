// DISCLAIMER: GITHUB COPILOT WAS USED TO HELP WITH THIS FILE
// DISCLAIMER: Code may be similiar or copied from my own
// A2 submission for COMP2140.
import utils from '../config/utils';

/**
 * Fetches all the ratings from the specified api.
 *
 * @returns {Promise} Promise object represents the list of ratings
 */
const getRatings = async () => {
	const url = `${utils.BASE_URL}samplerating/?api_key=${utils.API_KEY}`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error('Something went wrong when fetching ratings from api', err);
	}
};

/**
 * Fetches and returns one specified rating based on a given id.
 *
 * @param {String} id Rating id
 * @returns {Promise} Promise object represents the rating with the specified id
 */
const getOneRating = async id => {
	const url = `${utils.BASE_URL}samplerating/${id}/?api_key=${utils.API_KEY}`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(
			'Something went wrong when fetching a single rating from api',
			err
		);
	}
};

/**
 * Creates and returns a new rating for a song sample to be posted onto the api.
 *
 * @param {String} sampleId Song sample id
 * @param {Number} rating Rating value to be added to the song sample
 * @returns {Promise} Promise object represents the newly created rating
 */
const createRating = async (sampleId, rating) => {
	const url = `${utils.BASE_URL}samplerating/?api_key=${utils.API_KEY}`;

	const data = {
		sample_id: sampleId,
		rating: rating,
		api_key: utils.API_KEY,
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const respData = await response.json();
		return respData;
	} catch (err) {
		console.error('Something went wrong when creating a rating', err);
	}
};

/**
 * Edits an existing rating with a new rating value.
 *
 * @param {String} id Rating id to be edited
 * @param {Number} newRating New rating value to edit the sample
 * @returns {Promise} Promise object represents the edited rating
 */
const editRating = async (id, newRating) => {
	const url = `${utils.BASE_URL}samplerating/${id}/?api_key=${utils.API_KEY}`;

	const ratingData = await getOneRating(id);

	const data = { ...ratingData, rating: newRating };

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const respData = await response.json();
		return respData;
	} catch (err) {
		console.error('Something went wrong when editing a rating', err);
	}
};

export default { getRatings, createRating, editRating };
