import { createStackNavigator } from '@react-navigation/stack';
import PlaySamplePage from '../pages/PlaySamplePage';
import MusicAtLocationPage from '../pages/MusicAtLocationPage';

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