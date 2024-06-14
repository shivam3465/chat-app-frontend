import profileImg from "../../../../../../../assets/profile.png"
import { IoMdSearch } from "react-icons/io";
import GradientIconWrapper from "../Icons/IconGradientWrapper";
import { IoEllipsisVertical } from "react-icons/io5";

const Header = ({conversation}) => {

	const {conversationImage,conversationName}=conversation;

	return (
		<div style={{boxShadow:"#0000001c 0px 3px 8px 0px"}} className="flex items-center border-b-[1px] border-gray-300 bg-white w-full py-[4px] px-4 z-10">
			<div className="flex items-center w-full ">
				<div className="w-[42px] h-[42px] rounded-full overflow-hidden border-black flex items-center justify-center mr-2">
					<img
						src={conversationImage || profileImg}
						alt="profile-image"
						className="w-full h-full object-cover"
					/>
				</div>
				<div>
					<div className="text-[15px] font-bold">
						{conversationName}
					</div>
					<div className="text-[11px] text-gray-600">Online</div>
				</div>
			</div>

			<div className="flex items-center ">
				<GradientIconWrapper className="text-[22px] cursor-pointer active:scale-95 mr-2">
					<IoMdSearch />
				</GradientIconWrapper>
				{/* <IoMdSearch className="text-[22px] text-[#7751f5] cursor-pointer active:scale-95 mr-2" /> */}
				<GradientIconWrapper className="text-[22px] cursor-pointer active:scale-95 mr-2">
					<IoEllipsisVertical />
				</GradientIconWrapper>
				{/* <HiOutlineDotsVertical className="text-[22px] text-[#7751f5] cursor-pointer active:scale-95 mr-2" /> */}
			</div>
		</div>
	);
};

export default Header;
