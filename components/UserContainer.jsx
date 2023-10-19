import { SafeAreaView, Image, Text } from 'react-native';
import { styles, additionalStyles } from '../styles/styles';
import { getIcons } from '../config/baseConfig';

const UserContainer = ({ profilePic, userName }) => {
	return (
		<SafeAreaView style={additionalStyles.currentLocationStatusUserContainer}>
			<Image
				style={additionalStyles.userContainerImg}
				source={profilePic ? { uri: profilePic } : getIcons().iconSmiley}
				resizeMode="cover"
			/>
			<Text style={additionalStyles.userContainerProfileName}>My name</Text>
		</SafeAreaView>
	);
};

export default UserContainer;
