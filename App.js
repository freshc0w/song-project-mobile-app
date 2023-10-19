import { Text, View } from 'react-native';
import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Footer from './components/Footer';

const App = () => {
	const [nearbyMusic, setNearbyMusic] = useState(null);
	const [profile, setProfile] = useState({ name: null, profilePic: null });
	return (
		<NavigationContainer>
			<Footer
				nearbyMusic={nearbyMusic}
				setNearbyMusic={setNearbyMusic}
				profile={profile}
				setProfile={setProfile}
			/>
		</NavigationContainer>
	);
};

export default App;
