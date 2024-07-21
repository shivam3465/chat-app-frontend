import { useSelector, useDispatch } from "react-redux";

import { IoIosArrowDown } from "react-icons/io";
import { TbPinned } from "react-icons/tb";

import profileImg from "../../../../../../../assets/profile.png";
import { getFormattedDate } from "../../../../../../utils/helperFunctions";
import {
	setConversations,
	setSelectedConversation,
} from "../../../../../../redux/slice/conversation.slice";

const Conversation = ({ conversation }) => {
	const {
		conversationImage,
		unreadMessageCount,
		conversationName,
		lastMessageSent,
		users,
		_id,
	} = conversation;

	const { conversations } = useSelector((state) => state.conversation);

	const dispatch = useDispatch();

	const handleConversationSelect = () => {
		dispatch(setSelectedConversation(conversation));

		let conversationIndex = conversations.findIndex(
			(curConv) => conversation._id === curConv._id
		);

		if (conversationIndex !== -1) {
			// Create a copy of the conversation object
			let updatedConversation = {
				...conversation,
				unreadMessageCount: 0,
			};

			let newConversations = [
				...conversations.slice(0, conversationIndex),
				updatedConversation,
				...conversations.slice(conversationIndex + 1),
			];

			dispatch(setConversations(newConversations));
		}
	};

	return (
		<div
			onClick={handleConversationSelect}
			className="px-[5px] py-[15px] my-1 mx-[16px] rounded-[12px] shadow-md shadow-[#dbdbdb] bg-white hover:border-[#566fff98] border-[#ebebeb] border-[2px] hover:cursor-pointer flex items-center">
			<div className="min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ml-1">
				<img
					src={conversationImage || profileImg}
					alt=""
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="border-0 border-black w-full px-4">
				<div className="flex items-center justify-between py-[2px]">
					<div className="font-bold text-[18px] capitalize max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap">
						{conversationName}
					</div>
					<div className="text-[12px]">
						{getFormattedDate(lastMessageSent?.createdAt || "")}
					</div>
				</div>

				<div className="flex items-center justify-between py-[2px]">
					<div
						className={`text-[13px] max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap ${
							unreadMessageCount > 0
								? "text-[#b951f5] font-semibold"
								: "text-black font-normal"
						} `}
						title={lastMessageSent?.messageContent || ""}>
						{lastMessageSent?.messageContent || ""}
					</div>

					<div className="flex items-center justify-between ">
						{unreadMessageCount > 0 && (
							<div
								className={`bg-bannerGradient text-white  flex items-center justify-center rounded-full font-bold ${
									unreadMessageCount > 10
										? "text-[10px] w-[25px] h-[25px]"
										: "text-[11px] w-[20px] h-[20px] "
								} mr-2 `}
								title={unreadMessageCount + " messages unread"}>
								{unreadMessageCount > 50
									? 50 + "+"
									: unreadMessageCount}
							</div>
						)}
						<TbPinned className="text-[18px] mr-2 text-[#7751f5] " />
						<IoIosArrowDown className="text-[18px] text-[#7751f5] " />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Conversation;
