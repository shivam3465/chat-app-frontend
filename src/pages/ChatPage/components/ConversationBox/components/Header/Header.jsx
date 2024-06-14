import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import profileImage from "../../../../../../../assets/profile.png";

import NotificationContainer from "./components/NotificationContainer/NotificationContainer";
import GradientIconWrapper from "../../../ChatBox/components/Icons/IconGradientWrapper";
import PopOverWrapper from "../../../../../../components/PopOverOptions/PopOverWrapper";

import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { IoEllipsisVertical, IoNotifications } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { BsGear } from "react-icons/bs";

import { logoutHandler } from "./services/request.handler";

const Header = () => {
	const [darkMode, setDarkMode] = useState(false);
	const [notificationCount, setNotificationCount] = useState(0);
	const [showAnimation, setShowAnimation] = useState(false);

	//to manage the closing of pop over component
	const [closePopOver, setClosePopOver] = useState(false);
	const dispatch = useDispatch();

	const timerRef = useRef(null);

	const { user, notifications } = useSelector((state) => state.user);

	const handleDarkModeChange = () => {
		setDarkMode(!darkMode);
	};

	const usersOptionsArray = [
		<div
			className="flex items-center justify-start px-4 py-2 cursor-pointer active:bg-[#ececec] hover:bg-[#d2a3fe39]"
			onClick={() => logoutHandler(dispatch)}>
			<MdOutlineLogout className="text-[#5d5d5d] text-[17px] mt-[2px] mr-2" />
			<div>Logout</div>
		</div>,
		<div
			className="flex items-center justify-start px-4 py-2 cursor-pointer active:bg-[#ececec] hover:bg-[#d2a3fe39]"
			onClick={() => {}}>
			<BsGear className="text-[#5d5d5d] text-[15px] mt-[2px] mr-2" />
			<div>Settings</div>
		</div>,
	];

	const notificationArray = [
		<NotificationContainer setClosePopOver={setClosePopOver} />,
	];

	useEffect(() => {
		const totalCount = notifications.length;
		const newCount = totalCount < 5 ? totalCount : "5+";

		setNotificationCount(newCount);

		if (totalCount > 0) {
			// Start animation
			setShowAnimation(true);

			// Clear the existing timer if any
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			// Set a timeout to stop the animation after 4000ms
			timerRef.current = setTimeout(() => {
				setShowAnimation(false);
			}, 10000);
		} else {
			// No notifications, stop animation immediately
			setShowAnimation(false);
		}

		return () => {
			// Cleanup on component unmount or dependency change
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [notifications]);

	return (
		<div
			style={{ boxShadow: "#0000001c 0px 3px 8px 0px" }}
			className="flex items-center justify-between py-[5px] px-3 bg-white border-b-[1px] border-gray-300 z-10">
			<div className="w-[40px] h-[40px] rounded-full overflow-hidden">
				<img src={profileImage} alt="" />
			</div>
			<div>{user?.userName}</div>
			<div className="flex items-center justify-between gap-4 relative">
				<GradientIconWrapper className="text-[20px] mb-1 cursor-pointer active:scale-[.95]">
					{darkMode ? (
						<MdLightMode
							onClick={handleDarkModeChange}
							className="text-[22px] cursor-pointer active:scale-[.95]"
						/>
					) : (
						<MdOutlineLightMode
							onClick={handleDarkModeChange}
							className="text-[22px] cursor-pointer active:scale-[.95]"
						/>
					)}
				</GradientIconWrapper>

				<PopOverWrapper
					optionsArray={notificationArray}
					shouldClosePopOver={closePopOver}>
					<div
						className="relative"
						onClick={() => setShowAnimation(false)}>
						<GradientIconWrapper className="text-[22px] cursor-pointer active:scale-[.95] z-10">
							<IoNotifications />
						</GradientIconWrapper>

						{showAnimation && (
							<div className="animate-ping bg-[#dd2626c7] w-[20px] aspect-square rounded-full absolute top-[-6px] right-[-2px] z-[1]"></div>
						)}

						{notificationCount > 0 && (
							<span className="absolute top-[-4px] right-0 bg-[red] text-white rounded-full text-[10px] w-[16px] text-center aspect-square z-10">
								{notificationCount}
							</span>
						)}
					</div>
				</PopOverWrapper>

				<PopOverWrapper
					optionsArray={usersOptionsArray}
					shouldClosePopOver={closePopOver}>
					<GradientIconWrapper className="text-[20px] cursor-pointer active:scale-[.95]">
						<IoEllipsisVertical />
					</GradientIconWrapper>
				</PopOverWrapper>
			</div>
		</div>
	);
};

export default Header;
