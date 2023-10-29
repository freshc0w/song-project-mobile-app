import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/styles';
import { LinearGradient } from 'expo-linear-gradient';

import MapPage from '../pages/MapPage';
import ProfilePage from '../pages/ProfilePage';

import { tabBarOptions, getIcons } from '../config/baseConfig';
import PlayMusicStackScreen from './PlayMusicStackScreen';

const Tab = createBottomTabNavigator();

/**
 * Footer component that houses the navigation tabs.
 *
 * @param {Object} nearbyMusic The nearby music location information
 * @param {Function} setNearbyMusic The function to set the nearby music
 *  location information
 * @param {Object} profile The current user's profile information
 * @param {Function} setProfile The function to set the current user's
 *  profile information
 * @param {Array} locations All locations found from api
 * @returns {JSX.Element}
 */
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
