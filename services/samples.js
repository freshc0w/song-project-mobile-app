// DISCLAIMER: GITHUB COPILOT WAS USED TO HELP WITH THIS FILE
import utils from '../config/utils';

const getOneMusicSample = async id => {
	const url = `${utils.BASE_URL}sample/${id}/?api_key=${utils.API_KEY}`;

	try {
		const response = await fetch(url);

		const data = await response.json();
		return data;
	} catch (err) {
		console.error('Something went wrong while getting data:', err);
	}
};

export default { getOneMusicSample }