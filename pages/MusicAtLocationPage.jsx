import { Text, View, SafeAreaView, Image } from 'react-native';
import {
	styles,
	isDark,
	colors,
	additionalStyles,
	mode,
} from '../styles/styles';
import { icons } from '../config/baseConfig';
import { Rating } from 'react-native-ratings';
import SongSampleContainer from '../components/SongSampleContainer';

const MusicAtLocationPage = () => {
	return (
		<SafeAreaView style={styles.nearbyAndPlayContainer}>
			<View style={styles.location}>
				<Image
					style={styles.locationIcon}
					source={isDark ? icons.locationIconLight : icons.locationIconDark}
				></Image>
				<Text style={styles.locationHeading}>UQ Lakes</Text>
			</View>
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
		</SafeAreaView>
	);
};

export default MusicAtLocationPage;
