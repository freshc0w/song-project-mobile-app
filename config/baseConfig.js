import { Image, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, styles } from '../styles/styles';
import MapPage from '../pages/MapPage';
import ProfilePage from '../pages/ProfilePage';
import MusicAtLocationPage from '../pages/MusicAtLocationPage';


export const icons = {
	Profile: require('../assets/tab-profile-white.png'),
	Map: require('../assets/tab-map-white.png'),
	'Music At Location': require('../assets/logo-white.png'),
};

export const allTabs = {
	Map: <MapPage />,
	'Music At Location': <MusicAtLocationPage />,
	Profile: <ProfilePage />,
};

export const tabBarOptions = (iconSrc, middle, nearbyMusic) => {
	middle && console.log('NEARBY MUSIC:', nearbyMusic);
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
