import { Text } from 'react-native';

const PlaySamplePage = ({ route, navigation }) => {
	console.log('navigation params', navigation.params);
	console.log('route params', route.params);
	return <Text>Play Sample Page</Text>;
};

export default PlaySamplePage;
