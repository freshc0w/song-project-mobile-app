import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { Rating } from 'react-native-ratings';

import {
	styles,
	additionalStyles,
	colors,
	mode,
	isDark,
} from '../styles/styles';
import utils from '../config/utils';

import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';
import UserContainer from '../components/UserContainer';
import ErrorText from '../components/ErrorText';
import ActiveBtn from '../components/ActiveBtn';

import ratingsService from '../services/ratings';

const PlaySamplePage = ({ route, navigation }) => {
	const [hasNavigationTransitioned, setHasNavigationTransitioned] =
		useState(false);
	const [webState, setWebState] = useState({
		loaded: false,
		actioned: false,
	});

	const [hasRated, setHasRated] = useState(false);
	const [currRating, setCurrRating] = useState(null);
	const [reloadErr, setReloadErr] = useState(false);

	const { nearbyMusic, currProfile, currSongSample } = route.params;
	const webRef = useRef();

	useEffect(
		() =>
			navigation.addListener('transitionEnd', () => {
				setHasNavigationTransitioned(true);
			}),
		[navigation, setHasNavigationTransitioned]
	);

	useEffect(
		() =>
			navigation.addListener('blur', () => {
				setHasNavigationTransitioned(false);
			}),
		[navigation, setHasNavigationTransitioned]
	);

	const webLoaded = () => {
		setWebState({
			...webState,
			loaded: true,
		});
	};

	const stringifiedPlaySong = (songData, songType) => {
		const strJsCode = `function playSong() {
            songData = JSON.parse(${JSON.stringify(songData)});
            preparePreview(songData, ${JSON.stringify(songType).toLowerCase()});
            playPreview();
    };
            playSong();`;

		return strJsCode;
	};

	const handleWebActionPress = () => {
		if (!webRef.current) return setReloadErr(true);

		if (!currSongSample.recording_data) {
			webRef.current.injectJavaScript(
				!webState.actioned ? 'playSong()' : 'stopSong()'
			);
		} else {
			webRef.current.injectJavaScript(
				!webState.actioned
					? stringifiedPlaySong(
							currSongSample.recording_data,
							currSongSample.type
					  )
					: 'stopSong()'
			);
		}
		setWebState({
			...webState,
			actioned: !webState.actioned,
		});
	};

	const handleRatingChange = async rating => {
		// If user hasn't rated yet, post rating
		if (!hasRated) {
			const createdRating = await ratingsService.createRating(
				currSongSample.id,
				rating
			);
			setHasRated(true);
			return createdRating;
		}

		const updatedRating = await ratingsService.editRating(
			currRating.id,
			rating
		);
		return updatedRating;
	};

	return (
		<SafeAreaView style={styles.nearbyAndPlayContainer}>
			<NearbyAndPlayHeader
				locationName={!nearbyMusic ? null : nearbyMusic.name}
			/>
			<Text style={styles.songName}>{currSongSample.name}</Text>
			<View>
				{hasNavigationTransitioned ? (
					<WebView
						ref={ref => (webRef.current = ref)}
						originWhitelist={['*']}
						source={{
							uri: utils.PLAY_TONE_URL,
						}}
						pullToRefreshEnabled={true}
						onLoad={webLoaded}
					/>
				) : null}
			</View>

			<ActiveBtn
				onPress={handleWebActionPress}
				text={webState.actioned ? 'Stop Music' : 'Play Music'}
				touchableStyles={styles.playButton}
				textStyles={{ fontWeight: 'bold' }}
			/>

			<Rating
				style={styles.ratingComponentAdjustable}
				type="custom"
				tintColor={isDark ? colors[mode].bgColor : null}
				ratingCount={5}
				imageSize={30}
				fractions={1}
				startingValue={2.5}
				onFinishRating={handleRatingChange}
			/>

			<ErrorText
				condition={reloadErr}
				text={utils.RELOAD_TO_PLAY_MSG}
				addedStyles={{ marginTop: 10, textAlign: 'center' }}
			/>

			<View style={additionalStyles.currentLocationStatusContainer}>
				<Text style={additionalStyles.currentLocationStatusHeading}>
					Currently At This Location
				</Text>
				<UserContainer
					profilePic={currProfile.profilePic}
					userName={currProfile.name || 'Create your profile and add a name!'}
				/>
				<UserContainer />
			</View>
		</SafeAreaView>
	);
};

export default PlaySamplePage;
