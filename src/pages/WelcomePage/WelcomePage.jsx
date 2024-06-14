import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProgressBar from "../ChatPage/components/ChatBox/components/Progressbar/ProgresBar";

import ChatIcon from "../../icons/ChatIcon";

const WelcomePage = () => {
	const { isLoggedIn, loading } = useSelector((state) => state.user);
	const [progress, setProgress] = useState(0);
	const intervalRef = useRef(null);

	// Simulate progress (you can replace this with actual data loading logic)
	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress < 85 ? prevProgress + 40 : 75
			);
		}, 1000);

		if(progress >= 75) clearInterval(intervalRef.current);

		if (!loading) setProgress(100);

		return () => clearInterval(intervalRef.current);
	}, [progress]);

	return (
		<div className="h-screen w-screen flex items-center justify-center bg-backgroundGradient shadow-md shadow-black">
			{loading ? (
				<div className="flex items-center flex-col justify-center rounded-[10px] h-auto min-w-[390px] bg-[white] p-4">
					<ChatIcon className={"w-[3.5rem] h-[3.5rem]"} />
					<ProgressBar percentage={progress > 100 ? 100 : progress} />
					<div className="mt-4  text-[24px] text-[#353535]">
						Welcome to the <span className="font-semibold text-[#8a4ef9]">We Chat</span> 
					</div>
				</div>
			) : (
				<>
					{isLoggedIn ? (
						<Navigate to={"/chat"} />
					) : (
						<Navigate to={"/login"} />
					)}
				</>
			)}
		</div>
	);
};

export default WelcomePage;
