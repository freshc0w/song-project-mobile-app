import { View, Image } from 'react-native';
import { styles } from '../styles/styles';

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

export default PhotoContainer;
