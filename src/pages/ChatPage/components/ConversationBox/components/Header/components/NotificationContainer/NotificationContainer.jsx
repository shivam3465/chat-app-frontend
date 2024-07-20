import { useSelector } from "react-redux";
import Notification from "./components/Notification";

const NotificationContainer = ({ setClosePopOver }) => {
	const { notifications } = useSelector((state) => state.user);

	return (
		<div className="px-1">
			<div className="flex flex-col w-full items-center justify-start overflow-y-auto max-h-[35rem] scrollbar-custom">
				{notifications?.length > 0 ? (
					notifications?.map((notification, i) => (
						<Notification
							notification={notification}
							key={i}
							setClosePopOver={setClosePopOver}
							notifications={notifications}
						/>
					))
				) : (
					<div className="py-2 px-4 rounded-md">
						No new Notification
					</div>
				)}
			</div>
		</div>
	);
};

export default NotificationContainer;
