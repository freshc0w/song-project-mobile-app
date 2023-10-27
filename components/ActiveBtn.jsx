import { Text, TouchableOpacity } from 'react-native';
import { colors, mode } from '../styles/styles';

const ActiveBtn = ({ onPress, text,touchableStyles, textStyles }) => {
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