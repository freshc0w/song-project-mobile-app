import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/styles';
import { LinearGradient } from 'expo-linear-gradient';

import MapPage from '../pages/MapPage';
import MusicAtLocationPage from '../pages/MusicAtLocationPage';
import ProfilePage from '../pages/ProfilePage';
import PlaySamplePage from '../pages/PlaySamplePage';

import { tabBarOptions, getIcons } from '../config/baseConfig';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const PlayMusicStack = createStackNavigator();

const PlayMusicStackScreen = ({ nearbyMusic, currProfile }) => {
	return (
		<PlayMusicStack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="Samples At Location"
		>
			<PlayMusicStack.Screen
				name="Play Sample"
				component={PlaySamplePage}
				initialParams={{ currProfile }}
			/>
			<PlayMusicStack.Screen
				name="Samples At Location"
				component={MusicAtLocationPage}
				initialParams={{ nearbyMusic }}
			/>
		</PlayMusicStack.Navigator>
	);
};

const Footer = ({
	nearbyMusic,
	setNearbyMusic,
	profile,
	setProfile,
	locations,
}) => {
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
				tabBarHideOnKeyboard: true,
			}}
		>
			<Tab.Screen
				name="Map"
				children={() => (
					<MapPage
						setNearbyMusic={setNearbyMusic}
						allLocations={locations}
					/>
				)}
				options={() => tabBarOptions(getIcons().Map)}
			/>
			<Tab.Screen
				name="Music At Location"
				children={() => (
					<PlayMusicStackScreen
						nearbyMusic={nearbyMusic}
						currProfile={profile}
					/>
				)}
				options={() =>
					tabBarOptions(getIcons()['Music At Location'], true, nearbyMusic)
				}
			/>
			<Tab.Screen
				name="Profile"
				children={() => (
					<ProfilePage
						currProfile={profile}
						handleSetProfile={setProfile}
					/>
				)}
				options={() => tabBarOptions(getIcons().Profile)}
			/>
		</Tab.Navigator>
	);
};

export default Footer;
