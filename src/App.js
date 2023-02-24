import { createContext } from 'react'

// components
import Map from './components/map/map'
import Notifications from './components/widgets/notifications'
import { Backdrop, Drawer } from './components/drawer/drawer'
import { Spinner } from './components/widgets/spinner'

// utils
import './App.css'
import { useBbox } from './contexts/bbox.context'
export const AppContext = createContext(null)

function App() {
	const { drawerOpen, geoJSON } = useBbox()
	const { geoError, isGettingGeoData } = geoJSON

	return (
		<>
			{isGettingGeoData && <Spinner />}
			<Drawer />
			{drawerOpen && <Backdrop />}
			<Map />
			{geoError && <Notifications geoError={geoError} />}
		</>
	)
}

export default App
