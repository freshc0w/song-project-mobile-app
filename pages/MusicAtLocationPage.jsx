import {
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import {
	styles,
} from '../styles/styles';
import SongSampleContainer from '../components/SongSampleContainer';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';

const MusicAtLocationPage = ({ route, navigation }) => {
	// Passed the NEARBY MUSIC PARAMS
	return (
		<SafeAreaView style={styles.nearbyAndPlayContainer}>
			<NearbyAndPlayHeader locationName={route.params.nearbyMusic.location} />
			<ScrollView>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('Play Sample', {
							locationId: '123',
							nearbyMusic: route.params.nearbyMusic,
						})
					}
				>
					<SongSampleContainer
						title="Song 1"
						date="01-01-2023"
						rating={4.5}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('Play Sample', {
							locationId: '222',
							nearbyMusic: route.params.nearbyMusic,
						})
					}
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
