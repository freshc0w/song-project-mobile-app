import { Image, View } from 'react-native';
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

export const tabBarOptions = (iconSrc, middle) => {
	return {
		tabBarIcon: ({ size, focused, color }) => {
			return (
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
			);
		},
	};
};

// export const tabBarOptions = iconSrc => {
// 	return {
// 		tabBarStyle: {
// 			display: 'flex',
// 			justifyContent: 'center',
// 			alignItems: 'center',
// 		},
// 		tabBarIcon: ({ size, focused, color }) => {
// 			return (
// 				iconSrc && (
// 					<View
// 						style={{
// 							alignItems: 'center',
// 							justifyContent: 'center',
// 							height: 80,
// 							width: 50,
// 						}}
// 					>
// 						<Image
// 							style={{
// 								height: size,
// 								tintColor: focused
// 									? colors.whiteColor
// 									: colors.whiteColorTranslucent,
// 								resizeMode: 'contain',
// 							}}
// 							source={iconSrc}
// 						/>
// 					</View>
// 				)
// 			);
// 		},
// 	};
// };
