import { Text } from 'react-native';
import { colors, mode } from '../styles/styles';

const ErrorText = ({ condition, text, addedStyles }) => {
  console.log("showing error", condition)
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
