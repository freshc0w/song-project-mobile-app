// DISCLAMER: GITHUB COPILOT WAS USED TO HELP WITH THIS FILE
import { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Footer from './components/Footer';
import locationServices from './services/locations';

/**
 * Runs the songtrax mobile application, starting with the map page.
 *
 * Houses the NavigationContainer with a Footer that contains all the pages
 * to navigate to. It also contains all the global states passed to the Tab
 * Navigator as props.
 *
 * @returns {JSX.Element}
 */
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
