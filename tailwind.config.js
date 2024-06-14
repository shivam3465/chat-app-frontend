/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				bannerGradient:
					"linear-gradient(50deg, rgb(119, 81, 245) 0%, rgba(144,78,222,0.836635728510154) 58%, rgb(182, 76, 252) 100%)",
				// backgroundGradient:
				// 	"conic-gradient(from 70deg,	rgba(92, 45, 246, 0.350) 0deg,	rgba(92, 45, 246, 0.350) 45deg,	rgba(145, 78, 222, 0.235) 90deg,	rgba(145, 78, 222, 0.235) 170deg,	rgba(226, 76, 252, 0.506) 215deg,	rgba(226, 76, 252, 0.506) 250deg,	rgba(92, 45, 246, 0.350) 360deg)",
				backgroundGradient: "linear-gradient(30deg, rgba(18, 78, 236, 0.5929382495185574) 0%, #bc1bd8ba 49%, #ef53508c 100%)"
			},
			backgroundColor: {
				conversation: "#b7d1f840",
			},
			boxShadow: {
				shadowTop: "5px 0 12px #d8d6d6",
				shadowCard: "0 0 12px #d8d6d6",
			},
			// keyframes: {
			// 	spin: {
			// 	  '0%, 100%': {
			// 		transform: 'rotate(0deg)',
			// 	  },
			// 	  '100%': {
			// 		transform: 'rotate(360deg)',
			// 	  },
			// 	},
			//   },
			//   animation: {
			// 	rotate: 'spin 100ms linear',
			//   },
		},
	},
	plugins: [],
};
