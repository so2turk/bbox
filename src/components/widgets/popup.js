export const Popup = ({ props }) => {
	return Object.keys(props).map((key) => (
		<div className="popup-line">
			<b>{key}</b> : {props[key]}
		</div>
	))
}
