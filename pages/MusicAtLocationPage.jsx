import { Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles, colors, mode } from '../styles/styles';
import utils from '../config/utils';
import SongSampleContainer from '../components/SongSampleContainer';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';
import ErrorText from '../components/ErrorText';
import { useState, useEffect } from 'react';
import sampleToLocationsService from '../services/sampleToLocations';
import ratingsService from '../services/ratings';
import MusicSamplesList from '../components/MusicSamplesList';

/**
 * Displays a list of music samples at a location.
 *
 * User can click on one of these samples to navigate to the Play Sample page, where they can play it.
 *
 * @param {Object | null} nearbyMusic Displays information of the nearby music location
 * @param {Object} navigation Navigation actions for Tab stacks
 * @returns {JSX.Element}
 */
const MusicAtLocationPage = ({ nearbyMusic, navigation }) => {
	// Tracks the list of samples at the location
	const [sampleList, setSampleList] = useState([]);

	// Tracks the list of ratings for the samples
	const [ratingsList, setRatingsList] = useState([]);

	/**
	 * Navigates a sample container to the Play Sample page based on the sample
	 * clicked on.
	 *
	 * @param {Object} nearbyMusic Nearby music location information
	 * @param {Object} currSongSample The specified music sample
	 */
	const handleSamplePress = (nearbyMusic, currSongSample) => {
		navigation.navigate('Play Sample', {
			nearbyMusic,
			currSongSample,
		});
	};

	/**
	 * Helper function to calculate the average rating of a sample.
	 *
	 * @param {Array} ratings A collection of ratings
	 * @param {String} sampleId A sample's id
	 * @returns {Number}
	 */
	const calcAvgRating = (ratings, sampleId) => {
		const sampleRatings = ratings.filter(
			rating => rating.sample_id === sampleId
		);

		if (!sampleRatings.length) return 0;

		const ratingsSum = sampleRatings.reduce(
			(sum, rating) => sum + rating.rating,
			0
		);

		return ratingsSum / sampleRatings.length;
	};

	useEffect(() => {
		/**
		 * Fetches all the samples at a location and sets it to the local state.
		 *
		 * @param {String} id A location's id
		 */
		const fetchMusicSamples = async id => {
			const samples = await sampleToLocationsService.getAllSamplesFromLocation(
				id
			);
			setSampleList(samples);
		};

		// If no nearby music is to be found or it has no id, do not fetch
		if (!nearbyMusic || !nearbyMusic.id) return;
		fetchMusicSamples(nearbyMusic.id);
	}, []);

	useEffect(() => {
		/**
		 * Fetches all the ratings and sets it to the local state.
		 */
		const fetchRatings = async () => {
			const ratings = await ratingsService.getRatings();
			setRatingsList(ratings);
		};

		fetchRatings();
	}, [nearbyMusic]);

	// Passed the NEARBY MUSIC PARAMS
	return (
		<SafeAreaView style={styles.nearbyAndPlayContainer}>
			<NearbyAndPlayHeader
				locationName={!nearbyMusic ? null : nearbyMusic.name}
			/>
			{/* Show anticipatory page with message */}
			<ErrorText
				condition={!nearbyMusic}
				text={utils.NOT_CLOSE_TO_LOCATION_MSG}
			/>

      <MusicSamplesList 
        musicSamples={sampleList}
        handleSamplePress={handleSamplePress}
        nearbyMusic={nearbyMusic}
        ratingsList={ratingsList}
      />
		</SafeAreaView>
	);
};

export default MusicAtLocationPage;
