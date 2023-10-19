import { Appearance, StyleSheet, Dimensions } from 'react-native';

// Light or Dark mode
// * TEMPORARY
export const mode = Appearance.getColorScheme() === 'dark' ? 'dark' : 'dark';
export const isDark = mode === 'dark';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// Light and Dark colour schemes
export const colors = {
	purpleColorLighter: '#A42DE8',
	blueColorLighter: '#318AFF',
	blueColorDarker: '#2D3DE8',
	blackColorTranslucentLess: 'rgba(0,0,0,0.35)',
	blackColorTranslucentMore: 'rgba(0,0,0,0.7)',
	whiteColor: '#ffffff',
	whiteColorTranslucent: 'rgba(255,255,255, 0.5)',
	light: {
		bgColor: '#ffffff',
		fgColor: '#800080',
		fgColorLighter: 'rgba(128,0,128,0.5)',
		headerTextColor: '#ffffff',
	},
	dark: {
		bgColor: '#422142',
		fgColor: '#f0c4f0',
		fgColorLighter: 'rgba(210,169,210,0.5)',
		headerTextColor: '#f0c4f0',
	},
};

export const styles = {
	nearbyAndPlayContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: 10,
		backgroundColor: colors[mode].bgColor,
	},
	heading: {
		fontSize: 30,
		fontWeight: 'bold',
		color: colors[mode].fgColor,
		paddingBottom: 0,
	},
	subHeading: {
		fontSize: 14,
		color: colors[mode].fgColor,
		paddingBottom: 25,
	},
	songName: {
		fontSize: 20,
		fontWeight: 'bold',
		color: colors[mode].fgColor,
		paddingBottom: 0,
	},
	location: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	locationHeading: {
		fontSize: 20,
		fontWeight: 'bold',
		color: colors[mode].fgColor,
		paddingBottom: 6,
	},
	playButton: {
		backgroundColor: colors[mode].fgColor,
		color: colors[mode].bgColor,
		fontWeight: 'bold',
		padding: 10,
		borderRadius: 10,
		textAlign: 'center',
	},
	locationIcon: {
		width: 35,
		height: 105,
	},
	currentLocation: {
		marginBottom: 10,
	},
	ratingComponent: {
		paddingTop: 15,
	},
	profileContainer: {
		padding: 20,
		backgroundColor: colors[mode].bgColor,
		flex: 1,
	},
	input: {
		marginTop: 20,
		backgroundColor: colors[mode].fgColorLighter,
		color: colors[mode].fgColor,
		borderRadius: 5,
		textAlign: 'center',
		height: 40,
	},
	photoEmptyView: {
		borderWidth: 2,
		borderRadius: 10,
		borderColor: colors[mode].fgColorLighter,
		borderStyle: 'dashed',
		height: height / 1.625,
	},
	photoFullImage: {
		width: '100%',
		borderRadius: 10,
    height: height/ 1.625,
	},
	addPhoto: {
		backgroundColor: colors[mode].fgColor,
		color: colors[mode].bgColor,
		fontWeight: 'bold',
		padding: 10,
		borderRadius: 10,
		textAlign: 'center',
		width: '50%',
		marginLeft: '25%',
		// marginTop: -(height / 3.25)
	},
	changePhoto: {
		backgroundColor: colors[mode].fgColor,
		color: colors[mode].bgColor,
		fontWeight: 'bold',
		padding: 10,
		borderRadius: 10,
		textAlign: 'center',
		width: '50%',
		marginLeft: '25%',
		marginTop: -(height / 12),
    alignItems: 'center',
	},
};

export const additionalStyles = StyleSheet.create({
	middleTabIcon: {
		width: 100,
	},
	mapViewContainer: {
		flex: 1,
	},
	mapView: {
		width: '100%',
		height: '100%',
	},
	profileHeadingContainer: {
		marginTop: 15,
	},
  profileButtonView: {
    position: 'absolute',
    bottom: 0,
  }
});

export const darkMapStyle = [
	{
		elementType: 'geometry',
		stylers: [
			{
				color: '#242f3e',
			},
		],
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#746855',
			},
		],
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#242f3e',
			},
		],
	},
	{
		featureType: 'administrative.locality',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				color: '#263c3f',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#6b9a76',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{
				color: '#38414e',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#212a37',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#9ca5b3',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: '#746855',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#1f2835',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#f3d19c',
			},
		],
	},
	{
		featureType: 'transit',
		elementType: 'geometry',
		stylers: [
			{
				color: '#2f3948',
			},
		],
	},
	{
		featureType: 'transit.station',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#17263c',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#515c6d',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#17263c',
			},
		],
	},
];
