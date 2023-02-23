import { createContext, useState } from 'react'

// components
import Map from './components/map'
import Notifications from './components/notifications'
import { Backdrop, Drawer } from './components/drawer'
import { Spinner } from './components/spinner'

// utils
import { useGetGeoData } from './hooks/getGeoData'
import './App.css'
export const AppContext = createContext(null)

function App() {
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [bbox, setBbox] = useState({
		min_lon: 13.405,
		min_lat: 52.519,
		max_lon: 13.41,
		max_lat: 52.52,
	})
	const { geoError, isGettingGeoData } = useGetGeoData({ bbox })

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	return (
		<AppContext.Provider
			value={{
				bbox,
				setBbox,
				drawerOpen,
				toggleDrawer,
			}}
		>
			{isGettingGeoData && <Spinner />}
			<Drawer />
			{drawerOpen && <Backdrop />}
			<Map />
			{geoError && <Notifications geoError={geoError} />}
		</AppContext.Provider>
	)
}

export default App
