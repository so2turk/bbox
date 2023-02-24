// components
import Tabs from './tabs'

// utils
import { useBbox } from '../../contexts/bbox.context'
import './drawer.css'

export const Drawer = () => {
	const { drawerOpen, setDrawerOpen, geoJSON } = useBbox()
	const { geoData } = geoJSON

	if (geoData?.length < 1 || geoData?.error?.length > 0) return

	return (
		<div className={drawerOpen ? 'drawer open' : 'drawer'}>
			<div className="arrows-container">
				<div className="arrows" onClick={() => setDrawerOpen(!drawerOpen)}>
					{drawerOpen ? (
						<img
							className="right"
							src="/assets/arrow-right.svg"
							alt="lol"
							width={30}
						/>
					) : (
						<img
							className="left"
							src="/assets/arrow-left.svg"
							alt="lol"
							width={30}
						/>
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
	const { drawerOpen, setDrawerOpen } = useBbox()

	return <div className="backdrop" onClick={() => setDrawerOpen(!drawerOpen)} />
}
