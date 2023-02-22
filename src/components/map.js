import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Map = () => {
	const center = { lat: 52.519, lng: 13.405 }
	const zoom = 16

	return (
		<>
			<MapContainer center={center} zoom={zoom} zoomControl={true}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</>
	)
}

export default Map
