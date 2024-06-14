import React from "react";

const Loader = ({ message, vertical, loaderColor = "#787878" }) => {
	return (
		<div
			className={`flex ${
				vertical ? "flex-col" : "flex-row"
			} justify-center`}>
			<div
				style={{
					borderColor: loaderColor,
					borderRightColor: "#33333317",
					borderBottomColor: "#33333317",
				}}
				className={`animate-spin w-[20px] h-[20px] rounded-full border-2 `}></div>
			{message && <div>message</div>}
		</div>
	);
};

export default Loader;
