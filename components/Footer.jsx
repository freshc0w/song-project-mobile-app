import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/styles';
import { LinearGradient } from 'expo-linear-gradient';

import MapPage from '../pages/MapPage';
import MusicAtLocationPage from '../pages/MusicAtLocationPage';
import ProfilePage from '../pages/ProfilePage';

import { tabBarOptions, icons } from '../config/baseConfig';
import { useContext } from 'react';
import { NearbyMusicContext } from '../App';

const Tab = createBottomTabNavigator();

const Footer = () => {
	const { nearbyMusic, setNearbyMusic } = useContext(NearbyMusicContext);
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarBackground: () => (
					<LinearGradient
						colors={[colors.purpleColorLighter, colors.blueColorDarker]}
						style={{ flex: 1 }}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
					/>
				),
				tabBarActiveBackgroundColor: colors.blackColorTranslucentLess,
				tabBarShowLabel: false,
        headerShown: false,
			}}
		>
			<Tab.Screen
				name="Map"
				children={() => <MapPage />}
				options={() => tabBarOptions(icons.Map)}
			/>
			<Tab.Screen
				name="Music At Location"
				children={() => <MusicAtLocationPage />}
				options={() =>
					tabBarOptions(icons['Music At Location'], true, nearbyMusic)
				}
			/>
			<Tab.Screen
				name="Profile"
				children={() => <ProfilePage />}
				options={() => tabBarOptions(icons.Profile)}
			/>
		</Tab.Navigator>
	);
};

export default Footer;
