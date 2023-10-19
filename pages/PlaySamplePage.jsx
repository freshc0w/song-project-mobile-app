import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';
import {
	styles,
	additionalStyles,
	colors,
	mode,
	isDark,
} from '../styles/styles';
import { Rating } from 'react-native-ratings';
import UserContainer from '../components/UserContainer';

// ? Use Webview
const PlaySamplePage = ({ route, navigation }) => {
	// console.log('navigation params', navigation.params);
	// * Probably pass the song itself instead of the song id?
	console.log('route params', route.params);
	return (
		<SafeAreaView style={styles.nearbyAndPlayContainer}>
			<NearbyAndPlayHeader locationName={route.params.nearbyMusic.location} />
			<Text style={styles.songName}>Song 1</Text>
			<TouchableOpacity style={styles.playButton}>
				<Text style={{ color: colors[mode].bgColor, fontWeight: 'bold' }}>
					Play Music
				</Text>
			</TouchableOpacity>
			<Rating
				style={styles.ratingComponentAdjustable}
				type="custom"
				tintColor={isDark ? colors[mode].bgColor : null}
				ratingCount={5}
				imageSize={30}
				fractions={1}
				startingValue={3}
			/>
			<View style={additionalStyles.currentLocationStatusContainer}>
				<Text style={additionalStyles.currentLocationStatusHeading}>
					Currently At This Location
				</Text>
				<UserContainer />
				<UserContainer />
			</View>
		</SafeAreaView>
	);
};

export default PlaySamplePage;
