import utils from '../config/utils';

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
