import { View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colorScheme, styles, colors } from '../styles/styles';
import { LinearGradient } from 'expo-linear-gradient';

import MapPage from '../pages/MapPage';
import MusicAtLocationPage from '../pages/MusicAtLocationPage';
import PlaySamplePage from '../pages/PlaySamplePage';
import ProfilePage from '../pages/ProfilePage';

import { tabBarOptions, allTabs, icons } from '../config/baseConfig';

const Tab = createBottomTabNavigator();

const Footer = () => {
	const isDark = colorScheme === 'dark';

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
				options={() => tabBarOptions(icons['Music At Location'], true)}
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
