import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import SongSampleContainer from '../components/SongSampleContainer';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';

const MusicAtLocationPage = ({ route, navigation }) => {
	const handleSamplePress = (id, nearbyMusic) => {
		navigation.navigate('Play Sample', {
			locationId: id,
			nearbyMusic,
		});
	};
	console.log('route params', route.params.nearbyMusic.name);
	// Passed the NEARBY MUSIC PARAMS
	return (
		<SafeAreaView style={styles.nearbyAndPlayContainer}>
			<NearbyAndPlayHeader locationName={route.params.nearbyMusic.name} />
			<ScrollView>
				<TouchableOpacity
					onPress={() =>
						handleSamplePress('111', route.params.nearbyMusic)
					}
				>
					<SongSampleContainer
						title="Song 1"
						date="01-01-2023"
						rating={4.5}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => handleSamplePress('222', route.params.nearbyMusic)}
				>
					<SongSampleContainer
						title="Song 2"
						date="01-01-2023"
						rating={3}
					/>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MusicAtLocationPage;
