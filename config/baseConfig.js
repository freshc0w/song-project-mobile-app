import { Image, View, Text } from 'react-native';
import { colors, isDark } from '../styles/styles';

/**
 * Helper function to get all the icons used in the application.
 *
 * @returns {Object} An object containing all the icons used in the application
 */
export const getIcons = () => {
	return {
		Profile: require('../assets/tab-profile-white.png'),
		Map: require('../assets/tab-map-white.png'),
		'Music At Location': require('../assets/logo-white.png'),
		locationIconLight: require('../assets/icon-pin-lightpurple.png'),
		locationIconDark: require('../assets/icon-pin-darkpurple.png'),
		iconSmiley: isDark
			? require('../assets/icon-smiley-lightpurple.png')
			: require('../assets/icon-smiley-darkpurple.png'),
	};
};

/**
 * Configures the tab bar options for each tab. Mainly used for icons
 * implementations.
 *
 * @param {String} iconSrc The icon source to be used
 * @param {Boolean} middle Checks if it is the middle tab
 * @param {Object} nearbyMusic Nearby music infotmation state
 * @returns {Object} An object containing the icon to be used in the tab bar
 */
export const tabBarOptions = (iconSrc, middle, nearbyMusic) => {
	return {
		tabBarIcon: ({ size, focused, color }) => {
			return (
				<View
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignContent: 'center',
						alignItems: 'center',
					}}
				>
					<Image
						style={{
							width: middle ? size * 5 : size,
							height: size,
							tintColor: focused
								? colors.whiteColor
								: colors.whiteColorTranslucent,
							resizeMode: 'contain',
						}}
						source={iconSrc}
					/>
					{/* Display "Music nearby" message if there is a nearby locations 
              with music samples */}
					{middle && nearbyMusic && (
						<Text
							style={{
								textAlign: 'center',
								color: focused
									? colors.whiteColor
									: colors.whiteColorTranslucent,
								fontSize: 10,
							}}
						>
							There's music nearby!
						</Text>
					)}
				</View>
			);
		},
	};
};
