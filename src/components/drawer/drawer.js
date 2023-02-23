import { useContext } from 'react'

// utils
import { AppContext } from '../../App'
import { useGetGeoData } from '../../hooks/getGeoData'
import './drawer.css'
import Tabs from './tabs'

export const Drawer = () => {
	const { bbox, drawerOpen, toggleDrawer } = useContext(AppContext)
	const { geoData } = useGetGeoData({ bbox })

	if (geoData?.length < 1 || geoData?.error?.length > 0) return

	return (
		<div className={drawerOpen ? 'drawer open' : 'drawer'}>
			<div className="arrows-container">
				<div className="arrows" onClick={toggleDrawer}>
					{drawerOpen ? (
						<img
							className="right"
							src="/arrow-right.svg"
							alt="lol"
							width={30}
						/>
					) : (
						<img className="left" src="/arrow-left.svg" alt="lol" width={30} />
					)}
				</div>
			</div>
			<div className="tabs-container">
				<Tabs />
			</div>
		</div>
	)
}

export const Backdrop = () => {
	const { toggleDrawer } = useContext(AppContext)

	return <div className="backdrop" onClick={toggleDrawer} />
}
