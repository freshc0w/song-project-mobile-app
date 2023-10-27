import utils from '../config/utils';

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
