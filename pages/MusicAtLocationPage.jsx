import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import SongSampleContainer from '../components/SongSampleContainer';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';

const MusicAtLocationPage = ({ nearbyMusic, route, navigation }) => {
	console.log('checking all nearby music at location:', nearbyMusic);
	const handleSamplePress = (id, nearbyMusic) => {
		navigation.navigate('Play Sample', {
			locationId: id,
			nearbyMusic,
		});
	};
	// Passed the NEARBY MUSIC PARAMS
	return (
		<SafeAreaView style={styles.nearbyAndPlayContainer}>
			<NearbyAndPlayHeader
				locationName={!nearbyMusic ? null : nearbyMusic.name}
			/>
			<ScrollView>
				<TouchableOpacity onPress={() => handleSamplePress('111', nearbyMusic)}>
					<SongSampleContainer
						title="Song 1"
						date="01-01-2023"
						rating={4.5}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleSamplePress('222', nearbyMusic)}>
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
