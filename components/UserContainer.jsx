import { SafeAreaView, Image, Text } from 'react-native';
import { additionalStyles } from '../styles/styles';
import { getIcons } from '../config/baseConfig';

/**
 * Displays a user's profile picture and associated username.
 *
 * @param {String} profilePic Profile picture uri
 * @param {String} userName User's name
 * @returns {JSX.Element}
 */
const UserContainer = ({ profilePic, userName }) => {
	return (
		<SafeAreaView style={additionalStyles.currentLocationStatusUserContainer}>
			<Image
				style={additionalStyles.userContainerImg}
				source={profilePic ? { uri: profilePic } : getIcons().iconSmiley}
				resizeMode="cover"
			/>
			<Text style={additionalStyles.userContainerProfileName}>
				{userName || 'And others...'}
			</Text>
		</SafeAreaView>
	);
};

export default UserContainer;
