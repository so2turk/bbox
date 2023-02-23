import useSWR from 'swr'
import { convertOsmToGeo, fetcher } from '../lib/service'
const url = 'https://www.openstreetmap.org/api/0.6/map'

export const useGetGeoData = ({ bbox }) => {
	const Url = `${url}?bbox=${bbox.min_lon},${bbox.min_lat},${bbox.max_lon},${bbox.max_lat}`
	const {
		data: osmData,
		error: geoError,
		mutate,
		isValidating: isGettingGeoData,
	} = useSWR(Url, fetcher, {
		revalidateOnFocus: false,
	})

	const geoData = convertOsmToGeo(osmData)

	const mutateGetGeoData = async () => {
		return await mutate(Url)
	}

	return {
		geoData,
		geoError,
		mutateGetGeoData,
		isGettingGeoData,
	}
}
