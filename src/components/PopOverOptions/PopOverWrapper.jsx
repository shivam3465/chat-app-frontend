import { useRef } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const defaultAnchor = {
	to: "bottom end",
	gap: "6px",
};

// passed shouldClosePopover because to control the closing and opening of popover
const PopOverWrapper = ({ children, optionsArray, anchor = defaultAnchor ,shouldClosePopOver = false}) => {
	const buttonRef = useRef(null);
	
	const handlePopOverClose = (shouldClosePopOver) => {		
		if (buttonRef.current && shouldClosePopOver === true) {			
			buttonRef.current.click();
		}
	};

	return (
		<Popover>
			<PopoverButton ref={buttonRef} className="outline-none">
				{children}
			</PopoverButton>
			<PopoverPanel
				anchor={anchor}
				className="flex flex-col bg-white shadow-shadowCard min-w-[150px] rounded-md left-[280px] border-[1px] border-[#63636332] z-[100]">
				{optionsArray?.map((item, i) => (
					<div
						onClick={handlePopOverClose}
						key={i}
						className="w-full">
						{item}
					</div>
				))}
			</PopoverPanel>
		</Popover>
	);
};

export default PopOverWrapper;
