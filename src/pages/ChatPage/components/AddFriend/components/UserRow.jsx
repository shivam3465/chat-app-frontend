import { useState } from "react";

import profileImage from "../../../../../../assets/download.jpg";
import Loader from "../../../../../components/Loader/Loader";
import { FaUserClock, FaUserPlus } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

import { getSocket } from "../../../../../context/socket";

import {
	handleFriendRequestDelivered,
	handleFriendRequestSending,
} from "../services/socketEventHandler";
import { useDispatch } from "react-redux";
import { setSelectedConversation, setShowModal } from "../../../../../redux/slice/conversation.slice";

const UserRow = ({ user }) => {
	const [loading, setLoading] = useState(false);
	const [sentRequest, setSentRequest] = useState(false);

	const dispatch = useDispatch();

	const socket = getSocket();

	const sendFriendRequest = () =>
		handleFriendRequestSending(socket, setLoading, {
			receiverUserId: user.id,
		});

	if (loading)
		handleFriendRequestDelivered(socket, setLoading, setSentRequest);

	const goToPersonalConversation = () => {
		dispatch(setSelectedConversation(user.conversation));
		dispatch(setShowModal(false));
	};

	return (
		<div
			className={`flex items-center justify-between w-full rounded-md px-3 py-[3px] my-[6px] hover:bg-[#efeeee] ${
				user.isFriend && "cursor-pointer"
			} `}>
			<img
				src={user.imageURL || profileImage}
				alt="profile-image"
				className="w-[52px] h-[52px] rounded-full"
			/>
			<div className="font-semibold w-full max-w-[250px] pl-2 text-ellipsis overflow-hidden mr-2 whitespace-nowrap">
				{user?.userName}
			</div>
			{loading ? (
				<Loader />
			) : (
				<div className="w-[22px]">
					{user.isFriend ? (
						<AiFillMessage
							onClick={goToPersonalConversation}
							className="active:scale-95 p-1 text-[#a175ff] cursor-pointer hover:text-gray text-[30px]"
							title="Message"
						/>
					) : user?.inviteSent || sentRequest ? (
						<FaUserClock
							className="active:scale-95 p-1 text-[#e77829af] cursor-pointer text-[30px]"
							title="Request Sent"
						/>
					) : (
						<FaUserPlus
							onClick={sendFriendRequest}
							className="active:scale-95 p-1 text-[#5293e3] cursor-pointer hover:text-[gray] text-[30px]"
							title="Send Request"
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default UserRow;
