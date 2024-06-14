import { useEffect, useState } from "react";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import UserRow from "./components/UserRow";
import { debouncedFetch, handleInputChange } from "./services/requestHandler";
import { useSelector } from "react-redux";
const Friends = [
	{
		userName: "John ",
		imageURL: "",
		id: "",
		isFriend: true,
	},
	{
		userName: "John",
		imageURL: "",
		id: "",
		isFriend: false,
	},
	{
		userName: "John",
		imageURL: "",
		id: "",
		isFriend: true,
	},
	{
		userName: "John",
		imageURL: "",
		id: "",
		isFriend: true,
		inviteSent: true,
	},
	{
		userName: "John",
		imageURL: "",
		id: "",
		isFriend: false,
	},
	{
		userName: "John",
		imageURL: "",
		id: "",
		isFriend: false,
		inviteSent: true,
	},
];

const AddFriend = () => {
	const [friends, setFriends] = useState([]);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => state.user);

	// Handle input change with debouncing
	const handleDebouncedInputChange = (input) => {
		handleInputChange(input, setQuery, setFriends, setLoading);
	};

	useEffect(() => {
		handleDebouncedInputChange("");
		return () => {
			// Cleanup: cancel any ongoing debounced fetch
			debouncedFetch.cancel();
		};
	}, []);

	return (
		<div className="px-3 pt-3">
			<SearchBar
				handleInputChange={handleDebouncedInputChange}
				inputValue={query}
				loading={loading}
				setInputValue={setQuery}
			/>
			<div className="flex flex-col h-[22rem] scrollbar-custom overflow-y-auto items-center justify-start w-full my-2">
				{loading ? (
					[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
						<div
							className="my-[5px] px-2 py-1 rounded-md bg-[#eeeeee] w-full min-h-[55px] flex items-center justify-between"
							key={i}>
							<div className="bg-[#b5b5b5a8] animate-pulse min-w-[45px] h-[45px] rounded-full"></div>
							<div className="w-full h-full px-3 pt-1">
								<div className="bg-[#b5b5b5a8] animate-pulse my-2 w-full h-[10px]  rounded-full"></div>
								<div className="bg-[#b5b5b5a8] animate-pulse w-full h-[10px] rounded-full"></div>
							</div>
							<div className="bg-[#b5b5b5a8] animate-pulse w-[22px] h-[22px] rounded-md"></div>
						</div>
					))
				) : friends.length > 0 ? (
					friends?.map((curUser, i) =>
						curUser.id == user.id ? (
							<div className="hidden" key={i}></div>
						) : (
							<UserRow key={i} user={curUser} />
						)
					)
				) : (
					<div>No Results Found</div>
				)}
			</div>
		</div>
	);
};

export default AddFriend;
