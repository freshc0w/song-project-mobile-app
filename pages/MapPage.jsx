import { View } from 'react-native';
import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import { isDark, darkMapStyle, additionalStyles } from '../styles/styles';
// import { locations } from '../config/locations';
import { findNearest, isPointWithinRadius } from 'geolib';

const MapPage = ({ setNearbyMusic, allLocations }) => {
	const CHECK_LOCATION_RADIUS = 100;
	const [locations, setLocations] = useState(allLocations);
	const [nearestLocation, setNearestLocation] = useState(null);
	const [mapState, setMapState] = useState({
		locationPermission: false,
		locations: [],
		userLocation: {
			// TODO: change this
			latitude: -27.5263381,
			longitude: 153.0954163,
			// Starts at "Indooroopilly Shopping Centre"
		},
		nearestLocation,
	});

	// When location data is updated due to fetch time.
	useEffect(() => {
		const formattedLocations = allLocations
			.filter(location => location.sharing)
			.map(location => {
				location.latitude = parseFloat(location.latitude);
				location.longitude = parseFloat(location.longitude);
				return location;
			});
		setLocations(formattedLocations);
	}, [allLocations]);

	useEffect(() => {
		setMapState({
			...mapState,
			locations,
		});
	}, [locations, setLocations]);

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
		const locationsWithinRange = mapState.locations.filter(location => {
			const locationCoords = {
				latitude: location.latitude,
				longitude: location.longitude,
			};
			return isPointWithinRadius(locationCoords, userLocation, radius);
		});

		return locationsWithinRange;
	};

	const findNearestLocation = (userLocation, viableLocations) => {
		// if (!viableLocations.length) return null;
		const nearestCoords = findNearest(
			userLocation,
			viableLocations.map(location => {
				const locationCoords = {
					latitude: location.latitude,
					longitude: location.longitude,
				};
				return locationCoords;
			})
		);

		const location = mapState.locations.find(
			location =>
				location.latitude === nearestCoords.latitude &&
				location.longitude === nearestCoords.longitude
		);
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
					if (mapState.locations.length) {
						const nearest = findNearestLocation(
							userLocation,
							findViableLocations(userLocation, CHECK_LOCATION_RADIUS)
						);
						setNearestLocation(nearest);
					}
					// update map state
					setMapState({
						...mapState,
						userLocation,
					});
				}
			);

			// return () => {
			//   if (subscription) {
			//     subscription.remove();
			//   }
			// };
		}
	}, [mapState.locationPermission, mapState.locations]);

	return (
		<View style={additionalStyles.mapViewContainer}>
			<MapView
				camera={{
					center: mapState.userLocation,
					pitch: 0, // 3d angle
					heading: 0, // compass direction
					zoom: 15, // android only
				}}
				showsUserLocation={mapState.locationPermission}
				style={additionalStyles.mapView}
				provider={PROVIDER_GOOGLE}
				customMapStyle={isDark ? darkMapStyle : null}
				// customMapStyle={darkMapStyle}
			>
				{mapState.locations.map(location => {
					const locationCoords = {
						latitude: location.latitude,
						longitude: location.longitude,
					};
					return (
						<Circle
							key={location.id}
							center={locationCoords}
							radius={CHECK_LOCATION_RADIUS}
							strokeWidth={3}
							strokeColor="#A42DE8"
							fillColor={
								isDark ? 'rgba(128,0,128,0.5)' : 'rgba(210,169,210,0.5)'
							}
						/>
					);
				})}
			</MapView>
		</View>
	);
};

export default MapPage;
