import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles/styles';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapPage from './pages/MapPage';
import MusicAtLocationPage from './pages/MusicAtLocationPage';
import PlaySamplePage from './pages/PlaySamplePage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';


const App = () => {
	return (
		<NavigationContainer>
			<Footer />
		</NavigationContainer>
	);
};

export default App;
