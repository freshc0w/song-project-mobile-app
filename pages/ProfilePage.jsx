import {
	Text,
	Image,
	View,
	SafeAreaView,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native';
import { useState, useEffect } from 'react';
import { styles, colors, additionalStyles, mode } from '../styles/styles';
import * as ImagePicker from 'expo-image-picker';
import PhotoContainer from '../components/PhotoContainer';

const ProfilePage = ({ currProfile, handleSetProfile }) => {
	const [photo, setPhoto] = useState({});
	const [profileName, setProfileName] = useState('');

	useEffect(() => {
		handleSetProfile({
			...currProfile,
			name: profileName,
		});
	}, [profileName]);
	const handleChangePhotoPress = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			quality: 1,
		});

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
			<TouchableOpacity
				style={!photo.uri ? styles.addPhoto : styles.changePhoto}
			>
				<Text
					style={{ color: colors[mode].bgColor }}
					onPress={handleChangePhotoPress}
				>
					{!photo.uri ? 'Add Photo' : 'Change Photo'}
				</Text>
			</TouchableOpacity>
			<View>
				<TextInput
					style={styles.input}
					placeholder="Enter your name"
					value={profileName}
					onChangeText={setProfileName}
				></TextInput>
			</View>
		</KeyboardAvoidingView>
	);
};

export default ProfilePage;
