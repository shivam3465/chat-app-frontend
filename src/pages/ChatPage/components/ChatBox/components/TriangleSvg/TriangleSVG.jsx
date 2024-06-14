import React from "react";

const TriangleSVG = ({ color, left }) => {
	return (
		<svg
			viewBox="0 0 8 13"
			height="13"
			width="8"
			preserveAspectRatio="xMidYMid meet"
			version="1.1"
			x="0px"
			y="0px"
			style={{ color }}
			enableBackground="new 008 13">
			<title>tail-out</title>
			<path
				opacity="0.13"
				d={
					left
						? "M5.188,1H0v11.19316.467-8.625 C7.526,2.156,6.958,1,5.188,1z"
						: "M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
				}></path>
			<path
				fill="currentColor"
				d={
					left
						? "M5.188,0H0v11.19316.467-8.62507.526,1.156,6.958,0,5.188,0z"
						: "M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
				}></path>
		</svg>
	);
};

export default TriangleSVG;
