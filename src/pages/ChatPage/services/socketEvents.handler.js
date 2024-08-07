import { MESSAGE_EVENTS, MESSAGE_STATUS } from "../../../Events/message.events";
import { USER_EVENTS } from "../../../Events/user.events";
import {
	setConversationLoading,
	setConversations,
} from "../../../redux/slice/conversation.slice";
import { setMessageObj } from "../../../redux/slice/message.slice";
import { setNotifications } from "../../../redux/slice/user.slice";
import { getData } from "../../../services/getData.api";

const findAndUpdateMessageObj = (
	messageObj,
	newMessageStatus,
	data,
	newMessageId = null
) => {
	let newMessageObj = { ...messageObj };
	const { messageId, conversationId } = data;

	const prevMessageArray = messageObj[conversationId] || [];
	const foundMessageIndex = prevMessageArray?.findIndex(
		(mes) => mes._id === messageId
	);

	if (foundMessageIndex !== -1) {
		// Create a copy of the previous message array
		const updatedMessageArray = [...prevMessageArray];

		// Create the base updated message object
		let updatedMessage = {
			...prevMessageArray[foundMessageIndex],
			status: newMessageStatus,
		};

		// Conditionally add the newMessageId if it exists
		if (newMessageId) {
			updatedMessage._id = newMessageId;
		}

		// Replace the old message with the updated message
		updatedMessageArray[foundMessageIndex] = updatedMessage;

		// Update the message object with the new array
		newMessageObj[conversationId] = updatedMessageArray;

		return newMessageObj;
	}
	return null;
};

const updateMessageStatus = (data, messageObj, dispatch, messageStatus) => {
	const { prevMessageId, newMessageId, conversationId, status } = data;

	if (!prevMessageId || !newMessageId || !conversationId || !status) {
		console.log(
			"faulty data received , data received : ",
			messageStatus,
			data
		);
		return;
	}

	const newMessageObj = findAndUpdateMessageObj(
		messageObj,
		messageStatus,
		{
			messageId: prevMessageId,
			conversationId,
		},
		newMessageId
	);
	if (newMessageObj) dispatch(setMessageObj(newMessageObj));
};

const findAndUpdateLastSentMessageInConversation = (
	message,
	conversationArr,
	selectedConversation,
	dispatch
) => {
	let conversationIndex = conversationArr.findIndex(
		(conversation) => conversation._id === message.conversationId
	);	

	if (conversationIndex !== -1) {
		// Create a copy of the conversation object
		let updatedConversation = {};
		updatedConversation =	!selectedConversation ||		
			message.conversationId !== selectedConversation?._id
				? {
						...conversationArr[conversationIndex],
						lastMessageSent: message,
						unreadMessageCount:
							(conversationArr[conversationIndex]
								.unreadMessageCount || 0) + 1,
				  }
				: {
						...conversationArr[conversationIndex],
						lastMessageSent: message,
				  };

		let newConversationArr = [
			...conversationArr.slice(0, conversationIndex),
			updatedConversation,
			...conversationArr.slice(conversationIndex + 1),
		];

		dispatch(setConversations(newConversationArr));
	}
};

//will look for the response of above emitted event
const handleFriendRequestAcceptedByUser = (
	socket,
	dispatch,
	prevNotifications
) => {
	if (socket) {
		socket?.on(USER_EVENTS.FRIEND_REQUEST_ACCEPTED, async (data) => {
			// console.log("notification received", data);

			let newNotifications = prevNotifications.filter(
				(Notification) => Notification.id !== data.id
			);
			newNotifications.push({
				...data,
				readOnly: true,
				notificationId: new Date().getTime(),
			});

			//fetch new conversation
			dispatch(setConversationLoading(true));
			const [result, error] = await getData("conversation/all");

			if (error) {
				console.log(error);
				return;
			}

			dispatch(setConversations(result?.conversations));

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
const handleNewMessageReceived = (
	socket,
	dispatch,
	messageObj,
	conversations,
	selectedConversation
) => {
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

			const { conversationId } = message;

			// console.log("new message received ", sender, message);

			let newMessageObj = { ...messageObj };

			const prevMessageArray = messageObj[conversationId];
			const newMessage = { ...message, self: false };			

			newMessageObj[conversationId] = prevMessageArray
				? [...prevMessageArray, newMessage]
				: [newMessage];

			dispatch(setMessageObj(newMessageObj));

			//updating in particular conversation for unread messages
			findAndUpdateLastSentMessageInConversation(
				message,
				conversations,
				selectedConversation,
				dispatch
			);
		});
	}
};

//when current user is sender
const handleSentMessageStatusUpdate = (socket, dispatch, messageObj) => {
	if (socket) {
		socket.on(MESSAGE_EVENTS.MESSAGE_DELIVERED, (data) => {
			updateMessageStatus(
				data,
				messageObj,
				dispatch,
				MESSAGE_STATUS.DELIVERED
			);
		});

		socket.on(MESSAGE_EVENTS.MESSAGE_RECEIVED_BY_SERVER, (data) => {
			updateMessageStatus(
				data,
				messageObj,
				dispatch,
				MESSAGE_STATUS.SENT
			);
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

			let newMessageObj = findAndUpdateMessageObj(
				messageObj,
				MESSAGE_STATUS.READ,
				data,
				null
			);

			if (newMessageObj) dispatch(setMessageObj(newMessageObj));
		});
	}
};

//when our message is not sent
const handleMessageFailure = (socket, dispatch, messageObj) => {
	if (socket) {
		socket.on(MESSAGE_EVENTS.MESSAGE_FAILED, (data) => {
			let newMessageObj = findAndUpdateMessageObj(
				messageObj,
				MESSAGE_STATUS.FAILURE,
				data
			);

			dispatch(setMessageObj(newMessageObj));
		});
	}
};

export {
	handleFriendRequestAcceptedByUser,
	handleFriendRequestReceived,
	handleNewMessageReceived,
	handleSentMessageStatusUpdate,
	handleMessageReadByReceiver,
	handleMessageFailure,
};
