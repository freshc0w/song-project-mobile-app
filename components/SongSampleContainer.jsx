import { View, Text } from 'react-native';
import {
	styles,
	colors,
	additionalStyles,
	mode,
	isDark,
} from '../styles/styles';
import { Rating } from 'react-native-ratings';

const SongSampleContainer = ({ title, date, rating }) => {
	return (
		<View style={additionalStyles.songSampleContainer}>
			<View style={additionalStyles.songSampleInfo}>
				<Text style={additionalStyles.songSampleTextInfo}>{title}</Text>
				<Text style={additionalStyles.songSampleTextInfo}>{date}</Text>
			</View>
			<Rating
				style={styles.ratingComponent}
				type="custom"
				tintColor={isDark ? colors[mode].bgColor : null}
				ratingCount={5}
				imageSize={25}
				fractions={1}
				readonly
				startingValue={rating}
			/>
		</View>
	);
};

export default SongSampleContainer;
