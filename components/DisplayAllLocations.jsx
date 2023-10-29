import { Circle } from 'react-native-maps';
import { colors, isDark } from '../styles/styles';

/**
 * Displays all locations from a list of locations as circles in map view.
 *
 * @param {Array} locationsList A collection of locations
 * @param {Number} checkRadius The radius of the circle to check if the user is within
 * @returns {JSX.Element}
 */
const DisplayAllLocations = ({ locationsList, checkRadius }) => {
	return (
		<>
			{locationsList.map(location => (
				<Circle
					key={location.id}
					center={location.coords}
					radius={checkRadius}
					strokeWidth={3}
					strokeColor={colors.purpleColorLighter}
					fillColor={
						isDark ? colors.light.fgColorLighter : colors.dark.fgColorLighter
					}
				/>
			))}
		</>
	);
};

export default DisplayAllLocations;
