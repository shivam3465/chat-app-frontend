import PopOverWrapper from "../../../../../../components/PopOverOptions/PopOverWrapper";

import { FiPlus } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { setShowModal } from "../../../../../../redux/slice/conversation.slice";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../../../../../../components/ModalWrapper/ModalWrapper";
import AddFriend from "../../../AddFriend/AddFriend";

const AddConversation = () => {
	const { showModal } = useSelector((state) => state.conversation);
	const dispatch = useDispatch();

	const newConversationOptions = [
		<div
			className="flex items-center justify-start px-4 py-2 cursor-pointer active:bg-[#ececec] hover:bg-[#d2a3fe39]"
			onClick={() => dispatch(setShowModal(true))}>
			<FaUserPlus className="text-[#a5a5a5] text-[15px] mr-2" />
			<div>New Chat</div>
		</div>,
		<div className="flex items-center justify-start px-4 py-2 cursor-pointer active:bg-[#ececec] hover:bg-[#d2a3fe39]">
			<FaUserGroup className="text-[#a5a5a5] text-[15px] mr-2" />
			<div>New Group</div>
		</div>,
	];

	return (
		<div className="absolute bottom-[35px] right-[20px]">
			<PopOverWrapper
				optionsArray={newConversationOptions}
				anchor={{ gap: "8px", to: "bottom end" }}>
				<div className="text-[23px] cursor-pointer active:scale-[.95] bg-bannerGradient rounded-full p-[10px] shadow-[#3d3d3dad] shadow-md">
					<FiPlus className="text-white" />
				</div>
			</PopOverWrapper>
			<ModalWrapper isOpen={showModal} setIsOpen={setShowModal}>
				<AddFriend />
			</ModalWrapper>
		</div>
	);
};

export default AddConversation;
