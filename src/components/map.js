import { useRef } from 'react'
import L from 'leaflet'
import { FeatureGroup, MapContainer, TileLayer, useMap } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import ReactDOMServer from 'react-dom/server'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

const Map = ({ geoData, setBbox }) => {
	const center = { lat: 52.519, lng: 13.405 }
	const zoom = 16
	const mapRef = useRef()
	const geojsonMarkerOptions = {
		radius: 8,
		fillColor: '#ff7800',
		color: '#000',
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8,
	}

	const Popup = ({ props }) => {
		return Object.keys(props).map((key) => (
			<div className="popup-line">
				<b>{key}</b> : {props[key]}
			</div>
		))
	}

	const GeoJSONLayer = () => {
		const map = useMap()
		const popupOptions = {
			maxWidth: 300,
			maxHeight: 250,
		}

		L.geoJSON(geoData.GeoJSONData, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, geojsonMarkerOptions)
			},

			onEachFeature: (feature, layer) => {
				layer
					.bindPopup(
						ReactDOMServer.renderToString(<Popup props={feature.properties} />),
						popupOptions
					)
					.openPopup()
			},
		}).addTo(map)
	}

	const onDrawn = (e) => {
		const geo = mapRef.current?.toGeoJSON()
		const indexOfLastBox = geo.features.length - 1

		setBbox((prevState) => {
			return {
				...prevState,
				min_lon: geo.features[indexOfLastBox].geometry.coordinates[0][0][0],
				min_lat: geo.features[indexOfLastBox].geometry.coordinates[0][0][1],
				max_lon: geo.features[indexOfLastBox].geometry.coordinates[0][2][0],
				max_lat: geo.features[indexOfLastBox].geometry.coordinates[0][2][1],
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
							rectangle: true,
							circle: false,
							polyline: false,
							circlemarker: false,
							marker: false,
							polygon: false,
						}}
					/>
				</FeatureGroup>
				<GeoJSONLayer />
			</MapContainer>
		</>
	)
}

export default Map
