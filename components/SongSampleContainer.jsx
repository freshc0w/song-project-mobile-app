import { View, Text, TouchableOpacity } from 'react-native';
import {
	styles,
	colors,
	additionalStyles,
	mode,
	isDark,
} from '../styles/styles';
import { Rating } from 'react-native-ratings';
import { useState, useEffect } from 'react';
import samplesService from '../services/samples';

const SongSampleContainer = ({
	sample,
	handleSamplePressNavigation,
	nearbyMusic,
}) => {
	console.log('current sample', sample);
	const [currSongSample, setCurrSongSample] = useState({
		name: 'dummy',
	});

	useEffect(() => {
		const fetchSongSample = async () => {
			const songSample = await samplesService.getOneMusicSample(
				sample.sample_id
			);
			setCurrSongSample(songSample);
		};
		fetchSongSample();
	}, []);

	// Formats date time into 'DD-MM-YYYY'
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
				startingValue={0}
			/>
		</TouchableOpacity>
	);
};

export default SongSampleContainer;
