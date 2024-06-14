import { useState } from "react";
import { IoMdArrowBack, IoMdSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Loader from "../Loader/Loader";

const SearchBar = ({
	inputValue = "",
	loading = false,
	handleInputChange = () => {},
	setInputValue,
}) => {
	const handleClose = () => {
		console.log("button clicked");		
		setInputValue("");
	};

	return (
		<div className="w-full flex items-center justify-center pt-2 pb-[4px] bg-inherit">
			<div className="w-full flex items-center shadow-md shadow-[#d8d6d6bd] rounded-[15px] py-[2px] px-[6px] justify-between mx-[10px] bg-white overflow-hidden peer">

				<IoMdArrowBack
					className="active:scale-95 text-[22px] cursor-pointer text-[#595959] peer-focus:block hidden "
					onClick={handleClose}
				/>

				<IoMdSearch className="active:scale-95 text-[22px] cursor-pointer text-[#595959] block peer-focus:hidden" />

				<input
					type="text"
					value={inputValue}
					onChange={(e) => handleInputChange(e.target.value)}
					placeholder="Search"
					className=" w-full py-[3px] px-[5px] outline-none text-[14px] peer"
				/>
				
				{loading ? (
					<Loader />
				) : (
					<IoClose
						className="active:scale-95 text-[22px] cursor-pointer text-[#595959] peer-focus:block hidden "
						onClick={handleClose}
					/>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
