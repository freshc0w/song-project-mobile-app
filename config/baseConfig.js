import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../styles/styles';
import MapPage from '../pages/MapPage';
import ProfilePage from '../pages/ProfilePage';
import MusicAtLocationPage from '../pages/MusicAtLocationPage';

export const icons = {
	Profile: require('../assets/tab-profile-white.png'),
	Map: require('../assets/tab-map-white.png'),
};

export const allTabs = {
	Map: <MapPage />,
	'Music At Location': <MusicAtLocationPage />,
	Profile: <ProfilePage />,
};

// export const tabBarOptions = {
// 	tabBarBackground: () => (
// 		<LinearGradient
// 			colors={[colors.purpleColorLighter, colors.blueColorDarker]}
// 			style={{ flex: 1 }}
// 			start={{ x: 0, y: 0 }}
// 			end={{ x: 0, y: 1 }}
// 		/>
// 	),
// 	tabBarIcon: ({ size, focused, color }) => {
// 		return (
// 			<Image
// 				style={{ width: size, height: size }}
// 				source={icon}
// 			/>
// 		);
// 	},
// };

export const tabBarOptions = (iconSrc, isDark) => {
	return {
		tabBarBackground: () => (
			<LinearGradient
				colors={[colors.purpleColorLighter, colors.blueColorDarker]}
				style={{ flex: 1 }}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
			/>
		),
		tabBarIcon: ({ size, focused, color }) => {
			return (
				iconSrc && (
					<Image
						style={{
							width: size,
							height: size,
							tintColor: focused
								? colors.whiteColor
								: colors.whiteColorTranslucent,
						}}
						source={iconSrc}
					/>
				)
			);
		},
	};
};
