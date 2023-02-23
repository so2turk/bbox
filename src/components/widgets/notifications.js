const Notifications = ({ geoError }) => {
	return (
		<div className="notification-container">
			<div className="notification">{geoError.response.data}</div>
		</div>
	)
}

export default Notifications
