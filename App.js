import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Footer from './components/Footer';
import locationServices from './services/locations';

const App = () => {
	const [nearbyMusic, setNearbyMusic] = useState(null);
	const [profile, setProfile] = useState({ name: null, profilePic: null });
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		const fetchLocations = async () => {
			const data = await locationServices.getLocations();
			setLocations(data);
		};
		fetchLocations();
	}, []);

	return (
		<NavigationContainer>
			<Footer
				nearbyMusic={nearbyMusic}
				setNearbyMusic={setNearbyMusic}
				profile={profile}
				setProfile={setProfile}
        locations={locations}
			/>
		</NavigationContainer>
	);
};

export default App;
