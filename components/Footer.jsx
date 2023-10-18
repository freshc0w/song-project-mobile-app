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
		<Tab.Navigator initialRouteName="Map">
			{Object.keys(allTabs).map((tab, idx) => (
				<Tab.Screen
          key={idx}
					name={tab}
					children={() => allTabs[tab]}
					options={() => tabBarOptions(icons[tab], isDark)}
				/>
			))}
		</Tab.Navigator>
	);
};

export default Footer;
