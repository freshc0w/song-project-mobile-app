import { Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles, colors, mode } from '../styles/styles';
import utils from '../config/utils';
import SongSampleContainer from '../components/SongSampleContainer';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';
import ErrorText from '../components/ErrorText';
import { useState, useEffect } from 'react';
import sampleToLocationsService from '../services/sampleToLocations';
import ratingsService from '../services/ratings';

const MusicAtLocationPage = ({ nearbyMusic, route, navigation }) => {
	const [sampleList, setSampleList] = useState([]);
	const [ratingsList, setRatingsList] = useState([]);
	const handleSamplePress = (nearbyMusic, currSongSample) => {
		navigation.navigate('Play Sample', {
			nearbyMusic,
			currSongSample,
		});
	};

	const calcAvgRating = (ratings, sampleId) => {
		// if (!ratings.length) return 0;

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
		const fetchMusicSamples = async id => {
			const samples = await sampleToLocationsService.getAllSamplesFromLocation(
				id
			);
			setSampleList(samples);
		};

		if (!nearbyMusic || !nearbyMusic.id) return;
		fetchMusicSamples(nearbyMusic.id);
	}, []);

	useEffect(() => {
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
			{/* {!nearbyMusic && (
				<Text style={{ color: colors[mode].bgColor }}>
					Not close to any locations with samples. Check the Map page for closer
					locations
				</Text>
			)} */}
			<ErrorText
				condition={!nearbyMusic}
				text={utils.NOT_CLOSE_TO_LOCATION_MSG}
			/>

			<ScrollView>
				{sampleList.map(sample => {
					return (
						<SongSampleContainer
							key={sample.id}
							sample={sample}
							handleSamplePressNavigation={handleSamplePress}
							nearbyMusic={nearbyMusic}
							avgRating={calcAvgRating(ratingsList, sample.sample_id)}
						/>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
};

export default MusicAtLocationPage;
