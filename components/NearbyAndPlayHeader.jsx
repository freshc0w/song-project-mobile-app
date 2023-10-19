import { View, Text, Image } from 'react-native';
import { styles, isDark } from '../styles/styles';
import { getIcons } from '../config/baseConfig';

const NearbyAndPlayHeader = ({ locationName }) => {
	return (
		<View style={styles.location}>
			<Image
				style={styles.locationIcon}
				source={
					isDark ? getIcons().locationIconLight : getIcons().locationIconDark
				}
			></Image>
			<Text style={styles.locationHeading}>
				{locationName
					? locationName
					: 'Not near any locations with valid song samples'}
			</Text>
			{/* <Text style={styles.locationHeading}>
				{route.params.nearbyMusic.location}
			</Text> */}
		</View>
	);
};

export default NearbyAndPlayHeader;
