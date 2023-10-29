// DISCLAIMER: GITHUB COPILOT WAS USED TO HELP WITH THIS FILE
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { styles, additionalStyles } from '../styles/styles';

import PhotoContainer from '../components/PhotoContainer';
import ActiveBtn from '../components/ActiveBtn';

/**
 * Profile page of the app. Allows user to edit their profile picture and name.
 *
 * Obtains the current profile information from global state.
 * If none is found, it will be set to default values.
 *
 * @param {Object} currProfile Current profile data containing name
 *  and profile picture uri.
 * @param {Function} handleSetProfile Function to update global state
 *  with new profile data.
 * @returns {JSX.Element}
 */
const ProfilePage = ({ currProfile, handleSetProfile }) => {
	// Stores the photo's info with uri included.
	const [photo, setPhoto] = useState({});

	// Stores the user's inputted name.
	const [profileName, setProfileName] = useState('');

	useEffect(() => {
		// Set or update global profile name state with concurrent input
		handleSetProfile({
			...currProfile,
			name: profileName,
		});
	}, [profileName]);

	/**
	 * Handles the user's request to change their profile picture.
	 */
	const handleChangePhotoPress = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			quality: 1,
		});

		// If user selected a photo, update global state and local state
		if (
			!result.canceled &&
			result.assets &&
			result.assets.length > 0 &&
			result.assets[0].uri
		) {
			setPhoto(result.assets[0]);
			// Update global state
			handleSetProfile({
				...currProfile,
				profilePic: result.assets[0].uri,
			});
		}
	};

	return (
		<KeyboardAvoidingView
			behavior="position"
			style={styles.profileContainer}
		>
			<View style={additionalStyles.profileHeadingContainer}>
				<Text style={styles.heading}>Edit Profile</Text>
				<Text style={styles.subHeading}>Mirror, Mirror On The Wall...</Text>
			</View>

			<PhotoContainer photo={photo} />

			{/* Styles and text of button depends if the user has selected a photo */}
			{!photo.uri ? (
				<ActiveBtn
					onPress={handleChangePhotoPress}
					text="Add Photo"
					touchableStyles={styles.addPhoto}
				/>
			) : (
				<ActiveBtn
					onPress={handleChangePhotoPress}
					text="Change Photo"
					touchableStyles={styles.changePhoto}
				/>
			)}

			<View>
				<TextInput
					style={styles.input}
					placeholder="Enter your name"
					value={profileName}
					onChangeText={setProfileName}
				/>
			</View>
		</KeyboardAvoidingView>
	);
};

export default ProfilePage;
