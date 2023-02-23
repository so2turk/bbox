import { useContext, useState } from 'react'
import ReactJson from 'react-json-view'

// utils
import { AppContext } from '../../App'
import { useGetGeoData } from '../../hooks/getGeoData'
import './tabs.css'

function Tabs() {
	const [toggleState, setToggleState] = useState(2)
	const { bbox } = useContext(AppContext)
	const { geoData } = useGetGeoData({ bbox })

	if (geoData?.length < 1 || geoData?.error?.length > 0) return

	const toggleTab = (index) => {
		setToggleState(index)
	}

	return (
		<div className="container">
			<div className="bloc-tabs">
				<button
					className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
					onClick={() => toggleTab(1)}
				>
					JSON
				</button>
				<button
					className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
					onClick={() => toggleTab(2)}
				>
					Help
				</button>
			</div>

			<div className="content-tabs">
				<div
					className={toggleState === 1 ? 'content  active-content' : 'content'}
				>
					{geoData ? (
						<ReactJson
							src={geoData}
							collapsed={2}
							displayDataTypes={true}
							indentWidth={2}
							theme="monokai"
						/>
					) : (
						<h4>Please draw a rectangle</h4>
					)}
				</div>

				<div
					className={toggleState === 2 ? 'content  active-content' : 'content'}
				>
					<h2>Draw to Convert</h2>
					<p>
						Please use map tool to draw a rectangle. Coordinates of your
						rectangle will be used to fetch OSM data and will be converted to
						GeoJSON to be displayed on the map. You can also view your query as
						JSON file at the JSON Tab.
					</p>
					<img
						src="https://i.imgur.com/uWJNUcM.gif"
						alt="bbox gif"
						width="90%"
					/>
					<h4>Rules</h4>
					<p>
						You need to repeat your query with a smaller area
						<ul>
							<li>If requested area exceeds the max box size (0.25)</li>
							<li>If requested area contains more than 50000 nodes</li>
						</ul>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Tabs
