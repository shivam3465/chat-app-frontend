import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const socketRef = useRef(null);

	useEffect(() => {
		if (!socketRef.current) {
			const socketInstance = io(import.meta.env.VITE_BASE_URL, {
				withCredentials: true,
				extraHeaders: {
					"Access-Control-Allow-Origin": import.meta.env
						.VITE_BASE_URL,
					// "https://we-chat-2000.netlify.app",
				},
			});

			socketInstance.on("connect", () => {
				console.log(`Connected with socket ID: ${socketInstance.id}`);
				setSocket(socketInstance);
			});

			socketInstance.on("disconnect", () => {
				console.log(`Disconnected`);
				setSocket(null);
			});

			socketRef.current = socketInstance;
		}

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
			}
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
};

export { SocketProvider, getSocket };
