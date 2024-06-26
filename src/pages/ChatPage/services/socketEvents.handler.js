import { MESSAGE_EVENTS, MESSAGE_STATUS } from "../../../Events/message.events";
import { USER_EVENTS } from "../../../Events/user.events";
import { setMessageObj } from "../../../redux/slice/message.slice";
import { setNotifications } from "../../../redux/slice/user.slice";

//will look for the response of above emitted event
const handleFriendRequestAcceptedByUser = (
	socket,
	dispatch,
	prevNotifications
) => {
	if (socket) {
		socket?.on(USER_EVENTS.FRIEND_REQUEST_ACCEPTED, (data) => {
			// console.log("notification received", data);

			let newNotifications = prevNotifications.filter(
				(Notification) => Notification.id !== data.id
			);
			newNotifications.push({ ...data, readOnly: true });

			if (prevNotifications) dispatch(setNotifications(newNotifications));
			else dispatch(setNotifications([data]));
		});
	}
};

const handleFriendRequestReceived = (socket, dispatch, prevNotifications) => {
	if (socket) {
		socket.on(USER_EVENTS.RECEIVED_FRIEND_REQUEST, (data) => {
			let newNotifications = prevNotifications
				? [...prevNotifications]
				: [];
			newNotifications.push(data?.sender);

			// console.log("friend request received ", data);
			dispatch(setNotifications(newNotifications));
		});
	}
};

//when current user is receiver
const handleNewMessageReceived = (socket, dispatch, messageObj) => {
	if (socket) {
		socket.on(MESSAGE_EVENTS.NEW_MESSAGE_RECEIVED, (data) => {
			const { sender, message } = data;

			if (!sender || !message) {
				console.log(
					"faulty data received , data received : ",
					MESSAGE_EVENTS.NEW_MESSAGE_RECEIVED,
					data
				);
				return;
			}

			const {  conversationId } = message;

			// console.log("new message received ", sender, message);

			let newMessageObj = { ...messageObj };

			const prevMessageArray = messageObj[conversationId];
			const newMessage = { ...message, self: false };

			newMessageObj[conversationId] = prevMessageArray
				? [...prevMessageArray, newMessage]
				: [newMessage];

			dispatch(setMessageObj(newMessageObj));
		});
	}
};

//when current user is sender
const handleSentMessageStatusUpdate = (socket, dispatch, messageObj) => {
	if (socket) {
		socket.on(MESSAGE_EVENTS.MESSAGE_DELIVERED, (data) => {
			const { prevMessageId, newMessageId, conversationId, status } =
				data;

			if (!prevMessageId || !newMessageId || !conversationId || !status) {
				console.log(
					"faulty data received , data received : ",
					MESSAGE_EVENTS.MESSAGE_DELIVERED,
					data
				);
				return;
			}

			let newMessageObj = { ...messageObj };

			const prevMessageArray = messageObj[conversationId] || [];
			const foundMessageIndex = prevMessageArray?.findIndex(
				(mes) => mes._id === prevMessageId
			);

			if (foundMessageIndex !== -1) {
				const updatedMessageArray = [...prevMessageArray] || [];

				const updatedMessage = {
					...prevMessageArray[foundMessageIndex],
					_id: newMessageId,
					status,
				};

				// Replace the old message with the updated message
				updatedMessageArray[foundMessageIndex] = updatedMessage;

				// Update the message object with the new array
				newMessageObj[conversationId] = updatedMessageArray;

				dispatch(setMessageObj(newMessageObj));
			}
		});
	}
};

//here user is sender
const handleMessageReadByReceiver = (socket, dispatch, messageObj) => {
	if (socket) {
		socket.on(MESSAGE_EVENTS.MESSAGE_READ_BY_USER, (data) => {
			const { messageId, conversationId } = data;

			if (!messageId || !conversationId) {
				console.log(
					"faulty data received , data received : ",
					MESSAGE_EVENTS.MESSAGE_DELIVERED,
					data
				);
				return;
			}

			// console.log("message read by receiver ", data);

			let newMessageObj = { ...messageObj };

			const prevMessageArray = messageObj[conversationId] || [];
			const foundMessageIndex = prevMessageArray?.findIndex(
				(mes) => mes._id === messageId
			);			

			if (foundMessageIndex !== -1) {
				// Create a copy of the previous message array
				const updatedMessageArray = [...prevMessageArray];

				// Create the updated message object
				const updatedMessage = {
					...prevMessageArray[foundMessageIndex],
					status: MESSAGE_STATUS.READ,
				};

				// Replace the old message with the updated message
				updatedMessageArray[foundMessageIndex] = updatedMessage;

				// Update the message object with the new array
				newMessageObj[conversationId] = updatedMessageArray;

				dispatch(setMessageObj(newMessageObj));
			}
		});
	}
};

export {
	handleFriendRequestAcceptedByUser,
	handleFriendRequestReceived,
	handleNewMessageReceived,
	handleSentMessageStatusUpdate,
	handleMessageReadByReceiver,
};
