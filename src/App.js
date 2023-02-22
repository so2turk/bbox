import axios from 'axios'
import osmtogeojson from 'osmtogeojson'
import { useEffect, useState } from 'react'
import Map from './components/map'
import { Backdrop, Drawer } from './components/drawer'
import './App.css'

function App() {
	const [geoData, setGeoData] = useState({ GeoJSONData: [], error: '' })
	const [drawerOpen, setDrawerOpen] = useState(false)
	const url = 'https://www.openstreetmap.org/api/0.6/map'
	const [bbox, setBbox] = useState({
		min_lon: 13.405,
		min_lat: 52.519,
		max_lon: 13.41,
		max_lat: 52.52,
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
	}, [bbox])

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	return (
		<>
			<Drawer
				drawerOpen={drawerOpen}
				geoData={geoData}
				toggleDrawer={toggleDrawer}
			/>
			{drawerOpen && <Backdrop toggleDrawer={toggleDrawer} />}
			<Map geoData={geoData} bbox={bbox} setBbox={setBbox} />
		</>
	)
}

export default App
