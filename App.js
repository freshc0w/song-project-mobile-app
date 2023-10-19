import { Text, View } from 'react-native';
import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from './components/Footer';

const App = () => {
	const [nearbyMusic, setNearbyMusic] = useState(null);
	return (
		<NavigationContainer>
			<Footer
				nearbyMusic={nearbyMusic}
				setNearbyMusic={setNearbyMusic}
			/>
		</NavigationContainer>
	);
};

export default App;
