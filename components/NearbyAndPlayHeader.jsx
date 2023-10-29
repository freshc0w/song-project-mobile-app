import { View, Text, Image } from 'react-native';
import { styles, isDark } from '../styles/styles';
import { getIcons } from '../config/baseConfig';

/**
 * Header component that houses the location name.
 * If no location name is provided, it will display an anticipatory message.
 *
 * @param {String} locationName Name of a specific location
 * @returns {JSX.Element}
 */
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
		</View>
	);
};

export default NearbyAndPlayHeader;
