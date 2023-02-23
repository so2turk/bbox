import ReactJson from 'react-json-view'
import { useGetGeoData } from '../hooks/getGeoData'
import './drawer.css'

export const Drawer = ({ drawerOpen, toggleDrawer, bbox }) => {
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
			<div className="json-container">
				{geoData && (
					<div className="json">
						<ReactJson
							src={geoData}
							collapsed={1}
							displayDataTypes={true}
							indentWidth={2}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export const Backdrop = ({ toggleDrawer }) => {
	return <div className="backdrop" onClick={toggleDrawer} />
}
