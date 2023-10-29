import { Text } from 'react-native';
import { colors, mode } from '../styles/styles';

/**
 * Displays an error text based on a required condition.
 *
 * @param {Boolean} condition A condition to check if the error text
 *  should be displayed
 * @param {String} text The error text to display
 * @param {Object} addedStyles Additional styles to add to the error text
 * @returns {JSX.Element | null}
 */
const ErrorText = ({ condition, text, addedStyles }) => {
	return (
		<>
			{condition ? (
				<Text style={{ color: colors[mode].fgColor, ...addedStyles }}>
					{text}
				</Text>
			) : null}
		</>
	);
};

export default ErrorText;
