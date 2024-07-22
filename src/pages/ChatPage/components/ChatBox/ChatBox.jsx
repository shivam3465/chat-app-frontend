import { useEffect, useRef, useState } from "react";

import Header from "./components/Header/Header";
import Message from "./components/Message/Message";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { getSocket } from "../../../../context/socket";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages } from "./services/request.handler";
import { sendMessage } from "./services/socketEvent.handler";
import { useIsTabActive } from "../../../../hooks/useIsTabActive";
import { IoMdClose } from "react-icons/io";

// setMessages([
// 	{
// 		message: "Test Message",
// 		self: false,
// 		time: new Date(),
// 	},
// 	{
// 		message: "Ok",
// 		self: true,
// 		time: new Date(),
// 	},
// 	{
// 		message: "Looks good and think of UI",
// 		self: false,
// 		time: new Date(),
// 	},
// 	{
// 		message: "Ok because UI and functionality plays important role",
// 		self: false,
// 		time: new Date(),
// 	},
// 	{
// 		message: "Yes that's why I am taking time",
// 		self: true,
// 		time: new Date(),
// 	},
// ]);
//call for back to fetch all messages of this conversation

const ChatBox = () => {
	const [inputFile, setInputFile] = useState("");
	const [curMessage, setCurMessage] = useState("");
	const [repliedMessage, setRepliedMessage] = useState(null);
	const [highlightedReply, setHighlightedReply] = useState("");

	const dispatch = useDispatch();

	useIsTabActive();

	const { messageObj } = useSelector((state) => state.messages);

	const { user } = useSelector((state) => state.user);

	const { selectedConversation } = useSelector((state) => state.conversation);

	const fileRef = useRef(); //for input file

	const socket = getSocket(); //for getting socket instance

	//handling sending of message
	const sendMessageToMembers = () =>
		sendMessage(
			socket,
			curMessage,
			repliedMessage,
			messageObj,
			setCurMessage,
			setRepliedMessage,
			selectedConversation?.users,
			user.id,
			selectedConversation._id,
			dispatch
		);

	//when enter key is pressed - trigger for sending message
	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			sendMessageToMembers();
		}
	};

	useEffect(() => {
		fetchAllMessages(selectedConversation?._id, dispatch, messageObj);
	}, [selectedConversation]);

	const messageEndRef = useRef(null);
	const messageRefs = useRef({}); // Refs for each message

	// Function to scroll to the bottom of the messages
	const scrollToBottom = () => {
		if (messageEndRef.current) {
			messageEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	// Function to scroll to a specific message
	const scrollToMessage = (messageId) => {
		const messageElement = messageRefs.current[messageId];
		if (messageElement) {
			messageElement.scrollIntoView({ behavior: "smooth" });
			setHighlightedReply(messageId);
		}
	};

	useEffect(() => {
		if (highlightedReply) {
			const timeOut = setTimeout(() => {
				setHighlightedReply("");
				clearTimeout(timeOut);
			},800);
		}
	}, [highlightedReply]);

	// Automatically scroll to the bottom when messages change
	useEffect(() => {
		scrollToBottom();
	}, [messageObj[selectedConversation?._id]]);

	return (
		<div className="flex-[2] w-full overflow-hidden flex flex-col items-start border-l-[1px] border-[#dfdfdf90]">
			<Header conversation={selectedConversation} />
			<div className="overflow-y-auto h-full w-full pt-4 bg-[#f5f5f5] scrollbar-custom pb-4 ">
				{messageObj[selectedConversation._id] &&
					messageObj[selectedConversation._id]?.map((message, i) => {
						return (
							<Message
								key={i}
								messageRef={(el) =>
									(messageRefs.current[message._id] = el)
								}
								messageEndRef={messageEndRef}
								message={message}
								setRepliedMessage={setRepliedMessage}
								scrollToMessage={scrollToMessage}
								highlightReply={highlightedReply}
							/>
						);
					})}
			</div>

			{/* input section  */}
			<div className="bg-white w-full pt-2 shadow-shadowTop ">
				{repliedMessage && (
					<div
						className={`flex items-center justify-betweenmax-w-[95%] px-4 h-[32px] mr-4 ml-2 rounded-md mt-[5px] mb-[10px] bg-white cursor-pointer  `}>
						<div
							className={`w-full overflow-hidden text-ellipsis whitespace-nowrap border-[1px] border-l-[4px] pl-[6px] rounded-md h-full ${
								repliedMessage.self
									? "border-[#b17bef] bg-[#d8b7f95c]"
									: "border-[#aed9ee] bg-[#c4deef59]"
							} `}>
							{repliedMessage.messageContent}
						</div>
						<IoMdClose
							className="text-[20px] text-[#515151] border-[2px] border-[#515151] rounded-full w-[20px] aspect-auto cursor-pointer active:scale-95  font-bold ml-1"
							onClick={() => setRepliedMessage(null)}
						/>
					</div>
				)}
				<div className="mb-6 mx-4 flex items-center bg-[#f5f5f5] border-[1px] border-[#c3c3c349] overflow-hidden justify-between rounded-full">
					<GrAttachment
						onClick={() => fileRef.current.click()}
						className="text-[20px] mx-2 ml-4 *:font-bold cursor-pointer active:scale-95"
					/>
					<input
						type="file"
						name=""
						id=""
						className="hidden"
						value={inputFile}
						onChange={(e) => setInputFile(e.target.files[0])}
						ref={fileRef}
					/>

					<input
						type="text"
						value={curMessage}
						onChange={(e) => setCurMessage(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Type a message . . ."
						className="border-[1px] w-full bg-[#f5f5f5] whitespace-nowrap outline-none border-none resize-none py-2"
					/>

					<div
						className={`flex items-center justify-center bg-bannerGradient rounded-full p-3 ${
							curMessage
								? "cursor-pointer active:scale-95"
								: "cursor-not-allowed"
						}  `}
						onClick={sendMessageToMembers}>
						<IoSend className="text-[20px] text-white relative left-[3px] " />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatBox;
