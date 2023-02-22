import L from 'leaflet'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Map = ({ geoData }) => {
	const center = { lat: 52.519, lng: 13.405 }
	const zoom = 16
	const geojsonMarkerOptions = {
		radius: 8,
		fillColor: '#ff7800',
		color: '#000',
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8,
	}

	const GeoJSONLayer = () => {
		const map = useMap()
		L.geoJSON(geoData.GeoJSONData, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, geojsonMarkerOptions)
			},
		}).addTo(map)
	}

	return (
		<>
			<MapContainer center={center} zoom={zoom} zoomControl={true}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<GeoJSONLayer />
			</MapContainer>
		</>
	)
}

export default Map
