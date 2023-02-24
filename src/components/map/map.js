import { useRef } from 'react'
import { FeatureGroup, MapContainer, TileLayer } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

// utils
import GeoJSONLayer from './get-json-layer'
import { useBbox } from '../../contexts/bbox.context'

const Map = () => {
	const { setBbox } = useBbox()

	const mapRef = useRef()
	const center = { lat: 52.519, lng: 13.405 }
	const zoom = 14

	function onDrawn() {
		const geo = mapRef.current?.toGeoJSON()
		const indexOfLastBox = geo.features.length - 1
		const newBbox = {
			min_lon: geo.features[indexOfLastBox].geometry.coordinates[0][0][0],
			min_lat: geo.features[indexOfLastBox].geometry.coordinates[0][0][1],
			max_lon: geo.features[indexOfLastBox].geometry.coordinates[0][2][0],
			max_lat: geo.features[indexOfLastBox].geometry.coordinates[0][2][1],
		}

		setBbox((prevState) => {
			return {
				...prevState,
				...newBbox,
			}
		})
	}

	return (
		<>
			<MapContainer center={center} zoom={zoom} zoomControl={true}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<FeatureGroup ref={mapRef}>
					<EditControl
						position="topleft"
						onCreated={onDrawn}
						draw={{
							circle: false,
							polyline: false,
							circlemarker: false,
							marker: false,
							polygon: false,
							rectangle: {
								metric: 'metric',
							},
						}}
					/>
				</FeatureGroup>
				<GeoJSONLayer />
			</MapContainer>
		</>
	)
}

export default Map
