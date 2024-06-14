import { USER_EVENTS } from "../../../../../../../Events/user.events";

//here handling the events sent from frontend to backend
const handleAcceptFriendRequest = (socket, userId) => {
	if (socket) {
		socket.emit(USER_EVENTS.ACCEPT_FRIEND_REQUEST, {
			receiverUserId: userId,
		});
	} else console.log("no socket available for friend request sending");
};
 
const handleRejectFriendRequest = (socket, userId) => {
	if (socket) {
		socket.emit(USER_EVENTS.REJECT_FRIEND_REQUEST, {
			receiverUserId: userId,
		});
	} else console.log("no socket available for friend request sending");
};

export {
	handleAcceptFriendRequest,
	handleRejectFriendRequest,
};
