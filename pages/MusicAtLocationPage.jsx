import { Text, View, SafeAreaView, Image } from 'react-native';
import { styles, isDark } from '../styles/styles';
import { icons } from '../config/baseConfig';

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
		</SafeAreaView>
	);
};

export default MusicAtLocationPage;
