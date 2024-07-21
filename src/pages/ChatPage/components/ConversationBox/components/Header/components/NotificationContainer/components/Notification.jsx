import ProfileImage from "../../../../../../../../../../assets/profile.png";

import { IoMdCheckmark, IoMdClose } from "react-icons/io";

import { getSocket } from "../../../../../../../../../context/socket";
import {
	handleAcceptFriendRequest,
	handleRejectFriendRequest,
} from "../../../services/socketEvent.handler";
import { useDispatch } from "react-redux";
import { setNotifications } from "../../../../../../../../../redux/slice/user.slice";

const Notification = ({ notification, setClosePopOver, notifications }) => {
	const socket = getSocket();
	const dispatch = useDispatch();

	const acceptFriendRequest = () => {
		setClosePopOver(true);
		handleAcceptFriendRequest(socket, notification?.id);
	};

	const rejectFriendRequest = () => {
		setClosePopOver(true);
		closeNotification();
		handleRejectFriendRequest(socket, notification?.id);
	};

	const closeNotification = () => {
		setClosePopOver(true);		
		const newNotificationArray = notifications?.filter(
			(item) => item.id !== notification.id
		);
		dispatch(setNotifications(newNotificationArray));		
	};

	return (
		<div className="flex items-center justify-start px-2 py-4 w-full relative">
			{notification.readOnly && (
				<IoMdClose
					className="text-[18px] absolute top-1 right-1 cursor-pointer active:scale-95"
					onClick={closeNotification}
				/>
			)}

			<div className="w-[52px] h-[52px] rounded-full mx-2">
				<img
					src={ProfileImage}
					className="rounded-full"
					alt="profile-image"
				/>
			</div>

			<div>
				{/* notification content will be here  */}
				{notification.readOnly ? (
					<div className="max-w-[240px] px-2 pt-1 pb-3 text-[14px]">
						You got connected with <b>{notification?.userName} </b>{" "}
					</div>
				) : (
					<div className="max-w-[240px] px-2 pt-1 pb-3 text-[14px]">
						<b>{notification?.userName} </b> wants to connect with
						you
					</div>
				)}

				<div>
					{/* action buttons -> will be only available if it is a connection request */}
					{!notification?.readOnly && (
						<div className="flex items-center justify-start w-full">
							<button
								className="px-2 py-1 text-[12px] bg-[#8c51f1] text-white rounded-md min-w-[90px] mx-2 active:scale-95 flex items-center justify-start"
								onClick={acceptFriendRequest}>
								<IoMdCheckmark className="text-[14px] mr-1" />
								<span>Accept</span>
							</button>
							<button
								className="px-2 py-1 text-[12px] bg-slate-200 rounded-md min-w-[90px] mx-2 active:scale-95 flex items-center justify-start"
								onClick={rejectFriendRequest}>
								<IoMdClose className="text-[14px] mr-1" />
								<span>Reject</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Notification;
