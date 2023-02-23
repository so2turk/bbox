import axios from 'axios'
import osmtogeojson from 'osmtogeojson'

async function fetcher(url, params) {
	let options = {
		params: { ...params },
	}
	const response = await axios.get(url, options)
	return response
}

function convertOsmToGeo(osm) {
	if (osm?.data?.bounds) return osmtogeojson(osm.data)
}

export { fetcher, convertOsmToGeo }
