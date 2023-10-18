import { Text, View } from 'react-native';
import { createContext, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from './components/Footer';

export const NearbyMusicContext = createContext({
	nearbyMusic: null,
	setNearbyMusic: () => {},
});

const App = () => {
	const [nearbyMusic, setNearbyMusic] = useState(null);
	const value = { nearbyMusic, setNearbyMusic };
	return (
		<NavigationContainer>
			<NearbyMusicContext.Provider value={value}>
				<Footer />
			</NearbyMusicContext.Provider>
		</NavigationContainer>
	);
};

export default App;
