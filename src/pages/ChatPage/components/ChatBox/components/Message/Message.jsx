import { getFormattedTime } from "../../../../../../utils/helperFunctions";
import TriangleSVG from "../TriangleSvg/TriangleSVG";
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";

import { MESSAGE_STATUS } from "../../../../../../Events/message.events";
import { useEffect } from "react";
import { updateMessageStatusToREAD } from "../../services/socketEvent.handler";
import { getSocket } from "../../../../../../context/socket";
import { useSelector } from "react-redux";

const Message = ({ message, messageEndRef }) => {
	const { messageContent, self, time, status, _id, conversationId, owner } =
		message;

	const { isTabActive } = useSelector((state) => state.conversation);

	const socket = getSocket();

	useEffect(() => {
		if (status !== MESSAGE_STATUS.READ && !self && isTabActive) {
			updateMessageStatusToREAD(socket, _id, conversationId, owner);
		}
	}, [status, isTabActive]);

	return (
		<div
			ref={messageEndRef}
			className={`w-full flex px-4
             ${self ? "justify-end" : "justify-start"} `}
			title={
				MESSAGE_STATUS.FAILURE
					? "Failed to send the message"
					: messageContent
			}>
			<div
				className={`min-w-[85px] max-w-[52%]  px-3 py-[6px] rounded-[20px] text-[14px] my-[5px] relative mx-2 border-1 border-black shadow-md shadow-[#d8d6d6] pb-[16px] ${
					self
						? "rounded-tr-none bg-bannerGradient text-white"
						: "rounded-tl-none bg-[#e1e8ee] text-black"
				}`}>
				{/* this is just for triangle part */}
				<div
					className={`absolute top-0 ${
						self ? "right-[-6px]" : "left-[-6px]"
					}`}>
					<TriangleSVG
						color={self ? "#b54dfa" : "#e1e8ee"}
						left={self}
					/>
				</div>

				<span>{messageContent}</span>

				<div
					className={`text-[9px] ${
						self ? "text-[#e1e1e1]" : "text-[#747474]"
					} absolute bottom-[5px] right-[10px] flex items-center justify-start`}>
					<div>{getFormattedTime(time)}</div>
					{self ? (
						status ? (
							status === MESSAGE_STATUS.READ ? (
								<IoCheckmarkDoneOutline className="text-[14px] ml-1 text-[#4deeff]" />
							) : status === MESSAGE_STATUS.DELIVERED ? (
								<IoCheckmarkDoneOutline className="text-[14px] ml-1 text-[#e1e1e1]" />
							) : status === MESSAGE_STATUS.FAILURE ? (
								<CiCircleInfo className="text-[14px] ml-1 text-[#cd2727]" />
							) : (
								<IoCheckmarkOutline className="text-[14px] ml-1 text-[#e1e1e1]" />
							)
						) : (
							<CiClock2 className="text-[14px] ml-1 text-[#e1e1e1]" />
						)
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default Message;
