import {
	Text,
	Image,
	View,
	SafeAreaView,
	Button,
	TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { styles, colors, additionalStyles, mode } from '../styles/styles';
import * as ImagePicker from 'expo-image-picker';

const PhotoContainer = ({ photo }) => {
	return !photo.uri ? (
		<View style={styles.photoEmptyView}></View>
	) : (
		<Image
			style={styles.photoFullImage}
			source={{ uri: photo.uri }}
			resizeMode="cover"
		/>
	);
};

const ProfilePage = () => {
	const [photo, setPhoto] = useState({});

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
		}
	};

	return (
		<SafeAreaView style={styles.profileContainer}>
			<View style={additionalStyles.profileHeadingContainer}>
				<Text style={styles.heading}>Edit Profile</Text>
				<Text style={styles.subHeading}>Mirror, Mirror On The Wall...</Text>
			</View>
			<PhotoContainer photo={photo} />
			<TouchableOpacity style={styles.changePhoto}>
				<Text
					style={{ color: colors[mode].bgColor }}
					onPress={handleChangePhotoPress}
				>
					Change Photo
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default ProfilePage;
