import { Text, TouchableOpacity } from 'react-native';
import { colors, mode } from '../styles/styles';

/**
 * A helper component to display an active button.
 *
 * @param {Function} onPress A function to execute when the button is pressed
 * @param {String} text The text to display on the button
 * @param {Object} touchableStyles Additional styles to add to the button
 * @param {Object} textStyles Additional styles to add to the text
 * @returns {JSX.Element}
 */
const ActiveBtn = ({ onPress, text, touchableStyles, textStyles }) => {
	return (
		<TouchableOpacity
			style={{ ...touchableStyles }}
			onPress={onPress}
		>
			<Text style={{ color: colors[mode].bgColor, ...textStyles }}>{text}</Text>
		</TouchableOpacity>
	);
};

export default ActiveBtn;
