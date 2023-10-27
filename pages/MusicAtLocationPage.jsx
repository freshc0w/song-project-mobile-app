import { Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles, colors } from '../styles/styles';
import SongSampleContainer from '../components/SongSampleContainer';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';
import { useState, useEffect } from 'react';
import sampleToLocationsService from '../services/sampleToLocations';

const MusicAtLocationPage = ({ nearbyMusic, route, navigation }) => {
	const [sampleList, setSampleList] = useState([]);
	const handleSamplePress = (nearbyMusic, currSongSample) => {
		navigation.navigate('Play Sample', {
			nearbyMusic,
      currSongSample
		});
	};

	useEffect(() => {
		const fetchMusicSamples = async id => {
			const samples = await sampleToLocationsService.getAllSamplesFromLocation(
				id
			);
			console.log('samples fetched:', samples);
			setSampleList(samples);
		};

		if (!nearbyMusic || !nearbyMusic.id) return;
		fetchMusicSamples(nearbyMusic.id);
	}, []);

	// Passed the NEARBY MUSIC PARAMS
	return (
		<SafeAreaView style={styles.nearbyAndPlayContainer}>
			<NearbyAndPlayHeader
				locationName={!nearbyMusic ? null : nearbyMusic.name}
			/>
			{!nearbyMusic && (
				<Text style={{ color: colors.whiteColor }}>
					Not close to any locations with samples. Check the Map page for closer
					locations
				</Text>
			)}
			<ScrollView>
				{sampleList.map(sample => {
					return (
						<SongSampleContainer
							key={sample.id}
							sample={sample}
							handleSamplePressNavigation={handleSamplePress}
							nearbyMusic={nearbyMusic}
						/>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
};

export default MusicAtLocationPage;
