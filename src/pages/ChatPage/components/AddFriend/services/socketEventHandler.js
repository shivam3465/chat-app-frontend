import { USER_EVENTS } from "../../../../../Events/user.events";

const handleFriendRequestSending = (socket, setLoading, data) => {
	if (socket) {
		setLoading(true);
		socket.emit(USER_EVENTS.FRIEND_REQUEST_SENDING, data);
	} else console.log("no socket available for friend request sending");
};

//will look for the response of above emitted event
const handleFriendRequestDelivered = (socket, setLoading, setSentRequest) => {
	if (socket) {
		socket?.on(USER_EVENTS.FRIEND_REQUEST_DELIVERED, (data) => {
			setLoading(false);
			setSentRequest(true);
		});
	} else console.log("no socket available for friend request sending");
};

export { handleFriendRequestSending, handleFriendRequestDelivered };
