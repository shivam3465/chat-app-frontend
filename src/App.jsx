import { useEffect, useRef, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChatPage from "./pages/ChatPage/ChatPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import { useDispatch, useSelector } from "react-redux";
import {
	setIsLoggedIn,
	setLoading,
	setNotifications,
	setUser,
} from "./redux/slice/user.slice";
import { setConversations } from "./redux/slice/conversation.slice";
import { getData } from "./services/getData.api";
import { USER_ROUTES } from "./utils/config";
import { SocketProvider } from "./context/socket";

function App() {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Corrected destructuring
	const dispatch = useDispatch();

	const fetchInitiated = useRef(false);

	const fetchUserDetail = async () => {
		dispatch(setLoading(true));
		const [data, error] = await getData(USER_ROUTES.ME);
		dispatch(setLoading(false));

		if (data) {
			dispatch(setUser(data.user));
			dispatch(setIsLoggedIn(true));
			dispatch(setConversations(data.user.conversations));
			dispatch(setNotifications(data.user.invitesReceived));
		} else {
			dispatch(setUser({}));
			dispatch(setIsLoggedIn(false));

			console.log("Error: ", error);
		}
	};

	useEffect(() => {
		if (!fetchInitiated.current && !isLoggedIn) {
			fetchInitiated.current = true;
			fetchUserDetail();
		}
	}, [isLoggedIn]); // Adding `isLoggedIn` to dependencies ensures the effect runs when the login state changes

	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<WelcomePage />} />
					<Route
						path="/chat"
						element={
							<SocketProvider>
								<ChatPage />
							</SocketProvider>
						}
					/>
					<Route path="/login" element={<AuthPage />} />
					<Route
						path="/register"
						element={<AuthPage registerPage={true} />}
					/>
				</Routes>
			</Router>
			<ToastContainer />
		</div>
	);
}

export default App;
