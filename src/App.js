import axios from 'axios'
import osmtogeojson from 'osmtogeojson'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [geoData, setGeoData] = useState({ GeoJSONData: [], error: '' })
	const url = 'https://www.openstreetmap.org/api/0.6/map'
	const [bbox, setBbox] = useState({
		min_lon: 13.4,
		min_lat: 52.5,
		max_lon: 13.41,
		max_lat: 52.51,
	})

	useEffect(() => {
		const getGeoJSONData = async (bbox) => {
			try {
				const data = await axios.get(
					`${url}?bbox=${bbox.min_lon},${bbox.min_lat},${bbox.max_lon},${bbox.max_lat}`
				)
				const convertedData = osmtogeojson(data.data)
				setGeoData({ GeoJSONData: convertedData.features, error: '' })
			} catch (err) {
				setGeoData({ error: err.response.data })
				console.log(err)
			}
		}

		getGeoJSONData(bbox)
	}, [])

	return (
		<>
			<pre>{JSON.stringify(geoData, undefined, 2)}</pre>
		</>
	)
}

export default App
