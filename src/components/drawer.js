import ReactJson from 'react-json-view'
import './drawer.css'

export const Drawer = ({ drawerOpen, geoData, toggleDrawer }) => {
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
				{geoData?.GeoJSONData.length > 0 && (
					<div className="json">
						<ReactJson
							src={geoData.GeoJSONData}
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
