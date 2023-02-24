import { createContext, useContext, useState } from 'react'
import { useGetGeoData } from '../hooks/getGeoData'

const BboxContext = createContext({
	bbox: null,
	setBbox: null,
	drawerOpen: null,
	setDrawerOpen: null,
	geoJSON: null,
})

const BboxProvider = (props) => {
	const [bbox, setBbox] = useState({
		min_lon: 13.405,
		min_lat: 52.519,
		max_lon: 13.41,
		max_lat: 52.52,
	})
	const [drawerOpen, setDrawerOpen] = useState(true)
	const geoJSON = useGetGeoData({ bbox })

	return (
		<BboxContext.Provider
			value={{
				bbox,
				setBbox,
				drawerOpen,
				setDrawerOpen,
				geoJSON,
			}}
			{...props}
		/>
	)
}

const useBbox = () => {
	const context = useContext(BboxContext)
	if (context === undefined) {
		throw new Error('useBbox must be used within a BboxProvider')
	}
	return context
}

export { BboxContext, BboxProvider, useBbox }
