// DISCLAIMER: GITHUB COPILOT WAS USED TO HELP WITH THIS FILE
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { findNearest, isPointWithinRadius } from 'geolib';

import { isDark, darkMapStyle, additionalStyles } from '../styles/styles';

import DisplayAllLocations from '../components/DisplayAllLocations';
import locationsServices from '../services/locations';

/**
 * Map page of the app. Displays a map with a circle with a radius of 100m
 * around each location listed in the api.
 *
 * @param {Function} setNearbyMusic Handles setting the nearby music global state
 * @returns {JSX.Element}
 */
const MapPage = ({ setNearbyMusic }) => {
	const CHECK_LOCATION_RADIUS = 100;

	const initialMapState = {
		locationPermission: false,
		locations: [],
		userLocation: {
			// Begin at Mount Gravatt Tafe
			latitude: -27.526065,
			longitude: 153.0909823,
		},
		nearestLocation: null,
	};

	const [mapState, setMapState] = useState(initialMapState);

	// Request user permission
	useEffect(() => {
		/**
		 * Requests user permission to access their location.
		 *
		 * If permission is granted, set mapstate's locationPermission to true.
		 */
		const reqPermission = async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			status === 'granted' &&
				setMapState(mapState => {
					return { ...mapState, locationPermission: true };
				});
		};

		reqPermission();
	}, []);

	useEffect(() => {
		/**
		 * Fetches all locations from the api and sets it to the mapstate.
		 */
		const fetchLocations = async () => {
			const locations = await locationsServices.getLocations();

			// Format the location to include coords formatted as numbers
			const formattedLocations = locations
				.filter(location => location.sharing) // Only display locations to be shared
				.map(location => {
					location.coords = {
						latitude: parseFloat(location.latitude),
						longitude: parseFloat(location.longitude),
					};

					return location;
				});

			// Set local state
			setMapState(mapState => {
				return {
					...mapState,
					locations: formattedLocations,
				};
			});
		};

		fetchLocations();
	}, []);

	/**
	 * Finds all locations within the radius of the user's location.
	 *
	 * @param {Object} userLocation User's location in latitude and longitude
	 * @param {Number} radius Determines the radius of the detection circle
	 * @returns {Array} An array of locations within the radius
	 */
	const findViableLocations = (userLocation, radius) =>
		mapState.locations.filter(location =>
			// isPointWithinRadius is a geolib function that checks if a point is
			// within a radius of another point
			isPointWithinRadius(location.coords, userLocation, radius)
		);

	/**
	 * Finds the nearest location in respect to the user's location.
	 *
	 * @param {Object} userLocation User's location in latitude and longitude
	 * @param {Array} viableLocations Array of locations found within a
	 *  specified radius
	 * @returns {Object} The nearest location to the user
	 */
	const findNearestLocation = (userLocation, viableLocations) => {
		const nearestCoords = findNearest(
			userLocation,
			viableLocations.map(location => location.coords)
		);

		const location = mapState.locations.find(
			location => location.coords === nearestCoords
		);

		// set nearby music global state
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
          // Destructure to obtain user's coords
					const { latitude, longitude } = location.coords;
					const userLocation = { latitude, longitude };
					const nearestLocation = findNearestLocation(
						userLocation,
						findViableLocations(userLocation, CHECK_LOCATION_RADIUS)
					);
					// update map state of user's and nearest location
					setMapState(mapState => {
						return {
							...mapState,
							userLocation,
							nearestLocation,
						};
					});
				}
			);

			// Clean up function
			return () => {
				if (subscription) {
					subscription.then(res => {
						console.info('Cleaning up Effect ==> Removing Subscription..');
						return res.remove();
					});
				}
			};
		}
	}, [mapState.locations]);

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
			>
				<DisplayAllLocations
					locationsList={mapState.locations}
					checkRadius={CHECK_LOCATION_RADIUS}
				/>
			</MapView>
		</View>
	);
};

export default MapPage;
