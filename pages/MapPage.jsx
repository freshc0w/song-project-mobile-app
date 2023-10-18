import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import { isDark, styles } from '../styles/styles';
import { locations } from '../config/locations';
import { findNearest } from 'geolib';

const MapPage = () => {
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
		nearbyLocation: {},
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

	// user location is formated lat long
	const findClosestLocation = userLocation => {
		const nearestCoords = findNearest(
			userLocation,
			mapState.locations.map(location => location.coords)
		);

		const nearestLocation = mapState.locations.find(location => {
			return (
				location.coords.latitude === nearestCoords.latitude &&
				location.coords.longitude === nearestCoords.longitude
			);
		});

		return nearestLocation;
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
					const nearbyLocation = findClosestLocation(userLocation);
					// update map state
					setMapState({
						...mapState,
						userLocation,
						nearbyLocation,
					});
				}
			);
			return () => {
				subscription && subscription.remove();
			};
		}
	}, [mapState.locationPermission]);

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
			></MapView>
		</View>
	);
};

export default MapPage;
