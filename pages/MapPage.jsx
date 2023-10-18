import { View } from 'react-native';
import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState, useContext } from 'react';
import * as Location from 'expo-location';

import { isDark, styles, darkMapStyle } from '../styles/styles';
import { locations } from '../config/locations';
import { findNearest, isPointWithinRadius } from 'geolib';
import { NearbyMusicContext } from '../App';

const MapPage = () => {
	const CHECK_LOCATION_RADIUS = 100;

	const { nearbyMusic, setNearbyMusic } = useContext(NearbyMusicContext);
	const formattedLocations = locations.map(location => {
		const latLongArr = location.latlong.split(', ');

		location.coords = {
			latitude: parseFloat(latLongArr[0]),
			longitude: parseFloat(latLongArr[1]),
		};

		return location;
	});

	const initialMapState = {
		locationPermission: false,
		locations: formattedLocations,
		userLocation: {
			latitude: -27.5263381,
			longitude: 153.0954163,
			// Starts at "Indooroopilly Shopping Centre"
		},
		nearestLocation: null,
	};

	const [mapState, setMapState] = useState(initialMapState);

	// Request user permission
	useEffect(() => {
		const reqPermission = async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			status === 'granted' &&
				setMapState({ ...mapState, locationPermission: true });
		};

		reqPermission();
	}, []);

	// find available locations
	const findViableLocations = (userLocation, radius) => {
		const locationsWithinRange = mapState.locations.filter(location =>
			isPointWithinRadius(location.coords, userLocation, radius)
		);

		console.log('LOCATIONS WITHIN RANGE:', locationsWithinRange);

		return locationsWithinRange;
	};

	const findNearestLocation = (userLocation, viableLocations) => {
		// if (!viableLocations.length) return null;
		const nearestCoords = findNearest(
			userLocation,
			viableLocations.map(location => location.coords)
		);

		console.log('NEAREST COORDS:', nearestCoords);

		const location = mapState.locations.find(
			location => location.coords === nearestCoords
		);

		console.log('NEAREST LOCATION:', location);

		// set nearby music context
		setNearbyMusic(location || null);
		return location;
	};

	useEffect(() => {
		if (mapState.locationPermission) {
			const subscription = Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					distanceInterval: 10, // 10m
				},
				location => {
					const userLocation = {
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
					};
					const nearestLocation = findNearestLocation(
						userLocation,
						findViableLocations(userLocation, CHECK_LOCATION_RADIUS)
					);
					// update map state
					setMapState({
						...mapState,
						userLocation,
						nearestLocation,
					});
				}
			);

			// return () => {
			//   if (subscription) {
			//     subscription.remove();
			//   }
			// };
		}
	}, [
		mapState.locationPermission,
		// mapState.userLocation,
		// mapState.nearestLocation,
	]);

	return (
		<View style={styles.mapViewContainer}>
			<MapView
				camera={{
					center: mapState.userLocation,
					pitch: 0, // 3d angle
					heading: 0, // compass direction
					zoom: 15, // android only
				}}
				showsUserLocation={mapState.locationPermission}
				style={styles.mapView}
				provider={PROVIDER_GOOGLE}
				customMapStyle={isDark ? darkMapStyle : null}
				// customMapStyle={darkMapStyle}
			>
				{mapState.locations.map(location => (
					<Circle
						key={location.id}
						center={location.coords}
						radius={CHECK_LOCATION_RADIUS}
						strokeWidth={3}
						strokeColor="#A42DE8"
						fillColor={isDark ? 'rgba(128,0,128,0.5)' : 'rgba(210,169,210,0.5)'}
					/>
				))}
			</MapView>
		</View>
	);
};

export default MapPage;
