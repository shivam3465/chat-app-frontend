import Conversation from "./components/Conversation/Conversation";
import Header from "./components/Header/Header";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { FaLock } from "react-icons/fa6";
import AddConversationButton from "./components/AddConversation/AddConversation";
import { useSelector } from "react-redux";

const ConversationBox = () => {
	const { conversations } = useSelector((state) => state.conversation);

	return (
		<div className="flex-1 flex flex-col w-full bg-[#f5f5f5] relative">
			<Header />
			<SearchBar />

			<div className="overflow-y-auto h-full flex flex-col scrollbar-custom pt-2">
				{conversations?.map((conversation, i) => (
					<Conversation conversation={conversation || {}} key={i} />
				))}

				<div className="h-full flex items-end w-full justify-center border-0 border-black my-2">
					<div className="flex items-center justify-center my-4 text-[14px] text-[#4d4d4d] font-light">
						{" "}
						<FaLock className="mr-2 text-[10px]" /> All messages are
						end-to-end encrypted
					</div>
				</div>
			</div>

			<AddConversationButton />
		</div>
	);
};

export default ConversationBox;
