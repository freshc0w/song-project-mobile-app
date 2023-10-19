import { SafeAreaView, Image, Text } from 'react-native';
import { styles, additionalStyles } from '../styles/styles';
import { getIcons } from '../config/baseConfig';

const UserContainer = ({ profilePic, userName }) => {
	console.log('profile pic', profilePic);
	return (
		<SafeAreaView style={additionalStyles.currentLocationStatusUserContainer}>
			<Image
				style={additionalStyles.userContainerImg}
				// style={styles.photoFullImage}
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
