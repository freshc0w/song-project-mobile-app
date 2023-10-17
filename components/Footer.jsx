import { View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colorScheme, styles, colors } from '../styles/styles';
import { LinearGradient } from 'expo-linear-gradient';

import MapPage from '../pages/MapPage';
import MusicAtLocationPage from '../pages/MusicAtLocationPage';
import PlaySamplePage from '../pages/PlaySamplePage';
import ProfilePage from '../pages/ProfilePage';

import { tabBarOptions, allTabs } from '../config/baseConfig';
import FooterTab from './FooterTab';

const Tab = createBottomTabNavigator();

const Footer = () => {
	const isDark = colorScheme === 'dark';

	return (
		<Tab.Navigator initialRouteName="Map">
			{allTabs.map(tab => (
				<Tab.Screen
					name={Object.keys(tab)[0]}
					children={() => tab[Object.keys(tab)[0]]}
					options={tabBarOptions}
				/>
			))}
		</Tab.Navigator>
	);
	// return (
	// 	<Tab.Navigator initialRouteName="Map">
	// 		<Tab.Screen
	// 			name="Map"
	// 			children={() => <MapPage />}
	// 			options={{
	// 				tabBarBackground: () => (
	// 					<LinearGradient
	// 						colors={[colors.purpleColorLighter, colors.blueColorDarker]}
	// 						style={ {flex: 1} }
	// 						start={{x: 0, y: 0}}
	// 						end={{x: 0, y: 1}}
	// 					/>
	// 				),
	// 			}}
	// 		/>
	// 		<Tab.Screen
	// 			name="Music At Location"
	// 			children={() => <MusicAtLocationPage />}
	// 		/>
	// 		<Tab.Screen
	// 			name="Profile"
	// 			children={() => <ProfilePage />}
	// 		/>
	// 		{/* <Tab.Screen
	// 			name="Play Sample"
	// 			component={PlaySamplePage}
	// 		/> */}
	// 	</Tab.Navigator>
	// );
};

export default Footer;
