import {
	Text,
	View,
	SafeAreaView,
	Image,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import {
	styles,
	isDark,
	colors,
	additionalStyles,
	mode,
} from '../styles/styles';
import { getIcons } from '../config/baseConfig';
import SongSampleContainer from '../components/SongSampleContainer';

const MusicAtLocationPage = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.nearbyAndPlayContainer}>
			<View style={styles.location}>
				<Image
					style={styles.locationIcon}
					source={
						isDark ? getIcons().locationIconLight : getIcons().locationIconDark
					}
				></Image>
				<Text style={styles.locationHeading}>UQ Lakes</Text>
			</View>
			<ScrollView>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('Play Sample', { locationId: '123' })
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
						navigation.navigate('Play Sample', { locationId: '222' })
					}
				>
					<SongSampleContainer
						title="Song 2"
						date="01-01-2023"
						rating={3}
					/>
				</TouchableOpacity>
				<SongSampleContainer
					title="Song 3"
					date="01-01-2023"
					rating={2}
				/>
				<SongSampleContainer
					title="Song 1"
					date="01-01-2023"
					rating={4.5}
				/>
				<SongSampleContainer
					title="Song 2"
					date="01-01-2023"
					rating={3}
				/>
				<SongSampleContainer
					title="Song 3"
					date="01-01-2023"
					rating={2}
				/>
				<SongSampleContainer
					title="Song 1"
					date="01-01-2023"
					rating={4.5}
				/>
				<SongSampleContainer
					title="Song 2"
					date="01-01-2023"
					rating={3}
				/>
				<SongSampleContainer
					title="Song 3"
					date="01-01-2023"
					rating={2}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MusicAtLocationPage;
