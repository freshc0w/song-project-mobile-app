import { View } from 'react-native';
const FooterTab = ({ Tab, name, component, config }) => {
	return (
		<Tab.Screen
			name={name}
			children={() => component}
			options={config}
		/>
	);
};

export default FooterTab;
