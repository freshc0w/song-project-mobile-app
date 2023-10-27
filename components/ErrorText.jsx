import { Text } from 'react-native';
import { colors, mode } from '../styles/styles';

const ErrorText = ({ condition, text, addedStyles }) => {
	return (
		<>
			{condition ? (
				<Text style={{ color: colors[mode].fgColor, ...addedStyles}}>
					{text}
				</Text>
			) : null}
		</>
	);
};

export default ErrorText;
