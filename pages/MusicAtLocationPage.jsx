// DISCLAIMER: GITHUB COPILOT WAS USED TO HELP WITH THIS FILE
import { SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import utils from '../config/utils';

import { styles } from '../styles/styles';

import ErrorText from '../components/ErrorText';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';
import MusicSamplesList from '../components/MusicSamplesList';

import ratingsService from '../services/ratings';
import sampleToLocationsService from '../services/sampleToLocations';

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

	return (
		<SafeAreaView style={styles.nearbyAndPlayContainer}>
			<NearbyAndPlayHeader
				locationName={!nearbyMusic ? null : nearbyMusic.name}
			/>
			{/* Show anticipatory page with message if not near any locations
        or no music samples at current location. */}
			<ErrorText
				condition={!nearbyMusic || !sampleList.length}
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
