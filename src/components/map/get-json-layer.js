import ReactDOMServer from 'react-dom/server'
import L from 'leaflet'
import { useMap } from 'react-leaflet'

// components
import { Popup } from '../widgets/popup'

// utils
import { useBbox } from '../../contexts/bbox.context'

const GeoJSONLayer = () => {
	const map = useMap()
	const { bbox, geoJSON } = useBbox()
	const { geoData } = geoJSON

	const geojsonMarkerOptions = {
		radius: 8,
		fillColor: '#ff7800',
		color: '#000',
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8,
	}

	if (!map || geoData?.length < 1 || geoData?.error?.length > 0) return

	// set center as bbox's center
	map.setView({
		lat: (bbox.max_lat + bbox.min_lat) / 2,
		lng: (bbox.max_lon + bbox.min_lon) / 2,
	})

	// remove existing layer
	map.eachLayer(function (layer) {
		if (!!layer.toGeoJSON) {
			map.removeLayer(layer)
		}
	})

	const popupOptions = {
		maxWidth: 300,
		maxHeight: 250,
	}

	L.geoJSON(geoData, {
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

export default GeoJSONLayer
