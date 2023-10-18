import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../styles/styles';
import MapPage from '../pages/MapPage';
import ProfilePage from '../pages/ProfilePage';
import MusicAtLocationPage from '../pages/MusicAtLocationPage';

export const icons = {
	profile: require('../assets/tab-profile-white.png'),
};

// export const allTabs = [
// 	{ Map: <MapPage /> },
// 	{ Profile: <ProfilePage /> },
// 	{ 'Music At Location': <MusicAtLocationPage /> },
// ];

export const allTabs = {
	Map: <MapPage />,
	Profile: <ProfilePage />,
	'Music At Location': <MusicAtLocationPage />,
};

export const tabBarOptions = {
	tabBarBackground: () => (
		<LinearGradient
			colors={[colors.purpleColorLighter, colors.blueColorDarker]}
			style={{ flex: 1 }}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
		/>
	),
};
