// DISCLAIMER: GITHUB COPILOT WAS USED TO HELP WITH THIS FILE
import { ScrollView } from 'react-native';
import SongSampleContainer from './SongSampleContainer';

/**
 * Helper function to calculate the average rating of a sample.
 *
 * @param {Array} ratings A collection of ratings
 * @param {String} sampleId A sample's id
 * @returns {Number}
 */
const calcAvgRating = (ratings, sampleId) => {
	const sampleRatings = ratings.filter(rating => rating.sample_id === sampleId);

	if (!sampleRatings.length) return 0;

	const ratingsSum = sampleRatings.reduce(
		(sum, rating) => sum + rating.rating,
		0
	);

	return ratingsSum / sampleRatings.length;
};

/**
 * Displays a list of music samples on the 'Music At Location' Page.
 *
 * @param {Array} musicSamples A collection of music samples
 * @param {Function} handleSamplePress Handles the user's request
 * to play the sample
 * @param {Object} nearbyMusic A location object
 * @param {Array} ratingsList A collection of ratings
 * @returns {JSX.Element}
 */
const MusicSamplesList = ({
	musicSamples,
	handleSamplePress,
	nearbyMusic,
	ratingsList,
}) => {
	return (
		<ScrollView>
			{musicSamples.map(sample => (
				<SongSampleContainer
					key={sample.id}
					sample={sample}
					handleSamplePressNavigation={handleSamplePress}
					nearbyMusic={nearbyMusic}
					avgRating={calcAvgRating(ratingsList, sample.sample_id)}
				/>
			))}
		</ScrollView>
	);
};

export default MusicSamplesList;
