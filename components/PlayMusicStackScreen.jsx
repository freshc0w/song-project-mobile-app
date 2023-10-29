import { createStackNavigator } from '@react-navigation/stack';
import PlaySamplePage from '../pages/PlaySamplePage';
import MusicAtLocationPage from '../pages/MusicAtLocationPage';

/**
 * Stack navigator for playing music samples. Includes the Play Sample page and
 * the Music At Location page.
 *
 * @param {Object} nearbyMusic Nearby music location information
 * @param {Object} currProfile Current user's profile information
 * @returns {JSX.Element}
 */
const PlayMusicStackScreen = ({ nearbyMusic, currProfile }) => {
	const PlayMusicStack = createStackNavigator();

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
				children={({ navigation }) => (
					<MusicAtLocationPage
						nearbyMusic={nearbyMusic}
						navigation={navigation}
					/>
				)}
			/>
		</PlayMusicStack.Navigator>
	);
};

export default PlayMusicStackScreen;
