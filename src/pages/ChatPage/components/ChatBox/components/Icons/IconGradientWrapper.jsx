import React from "react";

const GradientIconWrapper = ({ children, className, props }) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			{...props}>
			<defs>
				<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop
						offset="0%"
						style={{
							stopColor: "rgb(119, 81, 245)",
							stopOpacity: 1,
						}}
					/>
					<stop
						offset="58%"
						style={{
							stopColor: "rgba(144, 78, 222, 0.836635728510154)",
							stopOpacity: 1,
						}}
					/>
					<stop
						offset="100%"
						style={{
							stopColor: "rgb(182, 76, 252)",
							stopOpacity: 1,
						}}
					/>
				</linearGradient>
			</defs>
			{/* {React.Children.map(children, child => { */}
			{/* return  */}
			{React.cloneElement(children, {
				style: { fill: "url(#grad1)" },
			})}
			{/* })} */}
		</svg>
	);
};

export default GradientIconWrapper;
