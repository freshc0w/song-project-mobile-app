// DISCLAIMER: GITHUB COPILOT WAS USED TO HELP WITH THIS FILE
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import {
	styles,
	colors,
	additionalStyles,
	mode,
	isDark,
} from '../styles/styles';
import samplesService from '../services/samples';

/**
 * Displays song sample information in a container.
 *
 * User can click on the container to navigate to the Play Sample page,
 * where they can play it. ALso displays the name, date and average rating of
 * the sample.
 *
 * @param {Object} sample Music sample information
 * @param {Function} handleSamplePressNavigation Function to navigate to
 *  'Play Sample' page
 * @param {Object | null} nearbyMusic Nearby music location information
 * @param {Number} avgRating Average rating of the sample
 * @returns {JSX.Element}
 */
const SongSampleContainer = ({
	sample,
	handleSamplePressNavigation,
	nearbyMusic,
	avgRating,
}) => {
	const [currSongSample, setCurrSongSample] = useState({
		name: 'Song Sample',
	});

	useEffect(() => {
		/**
		 * Fetches the song sample information from the api and set it to the
		 * local state.
		 */
		const fetchSongSample = async () => {
			const songSample = await samplesService.getOneMusicSample(
				sample.sample_id
			);
			setCurrSongSample(songSample);
		};
		fetchSongSample();
	}, []);

	/**
	 * Formats the date time to a readable format.
	 *
	 * @param {Date} datetime Date at which the sample was created
	 * @returns {String} Formatted date time in 'dd-mm-yyyy' format
	 */
	const formatDateTime = datetime => {
		const date = new Date(datetime);
		return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
	};

	return (
		<TouchableOpacity
			onPress={() => handleSamplePressNavigation(nearbyMusic, currSongSample)}
			style={additionalStyles.songSampleContainer}
		>
			<View style={additionalStyles.songSampleInfo}>
				<Text style={additionalStyles.songSampleTextInfo}>
					{currSongSample.name}
				</Text>
				<Text style={additionalStyles.songSampleTextInfo}>
					{formatDateTime(sample.datetime)}
				</Text>
			</View>
			<Rating
				style={styles.ratingComponent}
				type="custom"
				tintColor={isDark ? colors[mode].bgColor : null}
				ratingCount={5}
				imageSize={25}
				fractions={1}
				readonly
				startingValue={avgRating}
			/>
		</TouchableOpacity>
	);
};

export default SongSampleContainer;
