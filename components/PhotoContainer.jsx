import { View, Image } from 'react-native';
import { styles } from '../styles/styles';

/**
 * Helper component to display a photo.
 * 
 * @param {Object} photo Photo information containing uri
 * @returns {JSX.Element}
 */
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
