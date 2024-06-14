import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import ChatBox from "./components/ChatBox/ChatBox";
import ConversationBox from "./components/ConversationBox/ConversationBox";

import { getSocket } from "../../context/socket";
import {
	handleFriendRequestAcceptedByUser,
	handleFriendRequestReceived,
	handleMessageReadByReceiver,
	handleNewMessageReceived,
	handleSentMessageStatusUpdate,
} from "./services/socketEvents.handler";

const ChatPage = () => {
	const { isLoggedIn } = useSelector((state) => state.user);
	const { selectedConversation } = useSelector((state) => state.conversation);

	const { notifications } = useSelector((state) => state.user);

	const { messageObj } = useSelector((state) => state.messages);
	
	const dispatch = useDispatch();
	const socket = getSocket();

	handleFriendRequestAcceptedByUser(socket, dispatch, notifications);

	handleFriendRequestReceived(socket, dispatch, notifications);

	handleNewMessageReceived(socket,dispatch,messageObj)

	handleSentMessageStatusUpdate(socket,dispatch,messageObj)
	
	handleMessageReadByReceiver(socket,dispatch,messageObj)

	if (!isLoggedIn) return <Navigate to={"/"} />;

	// console.log("message array " , messageObj[selectedConversation?._id]);

	return (
		<div className="flex h-screen">
			<ConversationBox />

			{selectedConversation ? (
				<ChatBox />
			) : (
				<div className="flex-[2] w-full h-screen overflow-hidden flex flex-col items-center justify-center">
					<div className="text-[28px] text-[#6c25d688] font-bold px-8 text-center">
						Please select a conversation to start chatting 
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatPage;
