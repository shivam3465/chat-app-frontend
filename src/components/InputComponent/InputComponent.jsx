import { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const InputComponent = ({
	label = "",
	tag = "input-tag" + +Date.now(),
	type = "text",
	placeholder = "Enter here",
	handleInputChange,
	value = "",
    error= false,
	autoComplete
}) => {
	const [inputType, setInputType] = useState(type);
	const [hidePassword, setHidePassword] = useState(true);

	const togglePasswordView = () => {
		setHidePassword(!hidePassword);

		!hidePassword ? setInputType("password") : setInputType("text");
	};

	return (
		<div className="flex flex-col items-start justify-center w-full mt-[12px]">
			<label htmlFor={tag} className="text-[#696969] text-[12px] font-semibold">
				{label}
			</label>
			<div className={` ${error ? "border-[red]":" border-[#dddddd]"} my-1 shadow-shadowCard border-[1px] w-full rounded-[8px] overflow-hidden text-[#3b3b3b] flex items-center justify-between`}>
				<input
					type={inputType}
					id={tag}
					placeholder={placeholder}
					value={value}
					onChange={(e) => handleInputChange(tag, e.target.value)}
					autoComplete={autoComplete}
					className="py-1 px-2 w-full outline-none "
				/>
				{type === "password" ? (
					hidePassword ? (
						<IoIosEyeOff
							className="text-[18px] mr-1 cursor-pointer active:scale-[0.97]"
							onClick={togglePasswordView}
						/>
					) : (
						<IoMdEye
							className="text-[18px] mr-1 cursor-pointer active:scale-[0.97]"
							onClick={togglePasswordView}
						/>
					)
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default InputComponent;
