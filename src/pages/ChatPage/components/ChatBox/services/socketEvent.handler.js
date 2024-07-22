import { MESSAGE_EVENTS } from "../../../../../Events/message.events";
import { setMessageObj } from "../../../../../redux/slice/message.slice";

const sendMessage = (
	socket,
	curMessage,
	repliedMessage,
	messagesObj,
	setCurMessage,
	setRepliedMessage,
	users,
	userId,
	conversationId,
	dispatch
) => {
	if (!curMessage) return;
	const time = new Date();

	//get all members of this conversation
	const members = users.filter((curUser) => curUser.id !== userId);

	const message = repliedMessage
		? {
				messageContent: curMessage,
				repliedMessage: repliedMessage,
				conversationId: conversationId,
				members,
				time: new Date().toISOString(),
				_id: time.getTime(), // will be replaced with message id as soon as response comes after a new message creation
		  }
		: {
				messageContent: curMessage,
				conversationId: conversationId,
				members,
				time: new Date().toISOString(),
				_id: time.getTime(), // will be replaced with message id as soon as response comes after a new message creation
		  };

	const newMessageObj = { ...messagesObj };

	newMessageObj[conversationId] = [
		...messagesObj[conversationId],
		{ ...message, self: true },
	];

	dispatch(setMessageObj(newMessageObj));
	setCurMessage("");
	setRepliedMessage(null);

	if (socket) {
		socket.emit(MESSAGE_EVENTS.MESSAGE_SENT, message);
	}
};

const updateMessageStatusToREAD = (
	socket,
	messageId,
	conversationId,
	ownerId
) => {
	if (socket) {
		socket.emit(MESSAGE_EVENTS.READ_MESSAGE, {
			messageId,
			conversationId,
			messageOwnerId: ownerId,
		});
	}
};

export { sendMessage, updateMessageStatusToREAD };
