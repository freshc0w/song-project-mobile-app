import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';
import {
	styles,
	additionalStyles,
	colors,
	mode,
	isDark,
} from '../styles/styles';
import { Rating } from 'react-native-ratings';
import UserContainer from '../components/UserContainer';
import { useState, useEffect, useRef } from 'react';
import sampleToLocationsService from '../services/sampleToLocations';

const PlaySamplePage = ({ route, navigation }) => {
	// * Probably pass the song itself instead of the song id?
	const { nearbyMusic, currProfile, currSongSample } = route.params;
  const [hasNavigationTransitioned, setHasNavigationTransitioned] = useState(false);
	const [webState, setWebState] = useState({
		loaded: false,
		actioned: false,
	});

	const webRef = useRef();

	// useEffect(() => {
	//   const fetchMusicSample = id => {
	//   }
	// })

  useEffect(() => navigation.addListener('transitionEnd', () => {
    setHasNavigationTransitioned(true);
  }), [navigation, setHasNavigationTransitioned]);
  
  useEffect(() => navigation.addListener('blur', () => { 
    setHasNavigationTransitioned(false);
  }), [navigation, setHasNavigationTransitioned]);

	const webLoaded = () => {
		setWebState({
			...webState,
			loaded: true,
		});
	};

	const handleWebActionPress = () => {
		console.log('pressing button');

		webRef.current.injectJavaScript(
			!webState.actioned ? 'playSong()' : 'stopSong()'
		);
		setWebState({
			...webState,
			actioned: !webState.actioned,
		});
	};

	return (
		<SafeAreaView style={styles.nearbyAndPlayContainer}>
			<NearbyAndPlayHeader
				locationName={!nearbyMusic ? null : nearbyMusic.name}
			/>
			<Text style={styles.songName}>Song 1</Text>
			<View>
				{hasNavigationTransitioned ? (
					<WebView
						ref={ref => (webRef.current = ref)}
						originWhitelist={['*']}
						source={{
							uri: 'https://comp2140.uqcloud.net/static/samples/index.html',
						}}
						pullToRefreshEnabled={true}
						onLoad={webLoaded}
					/>
				) : null}
			</View>

			<TouchableOpacity
				onPress={handleWebActionPress}
				style={styles.playButton}
			>
				<Text style={{ color: colors[mode].bgColor, fontWeight: 'bold' }}>
					{webState.actioned ? 'Stop Music' : 'Play Music'}
				</Text>
			</TouchableOpacity>
			<Rating
				style={styles.ratingComponentAdjustable}
				type="custom"
				tintColor={isDark ? colors[mode].bgColor : null}
				ratingCount={5}
				imageSize={30}
				fractions={1}
				startingValue={3}
			/>
			<View style={additionalStyles.currentLocationStatusContainer}>
				<Text style={additionalStyles.currentLocationStatusHeading}>
					Currently At This Location
				</Text>
				<UserContainer
					profilePic={currProfile.profilePic}
					userName={currProfile.name}
				/>
				<UserContainer />
			</View>
		</SafeAreaView>
	);
};

export default PlaySamplePage;
