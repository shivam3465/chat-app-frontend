import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import InputComponent from "../../components/InputComponent/InputComponent";

import { setIsLoggedIn, setUser } from "../../redux/slice/user.slice";
import { postData } from "../../services/postData.api";
import { USER_ROUTES } from "../../utils/config";

import { FaArrowRightLong, FaLock } from "react-icons/fa6";
import { toast } from "react-toastify";

const validateData = (data, register, setError) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (register && (!data.userName || data.userName.length < 2)) {
		setError({
			userName: true,
			message: "Name must be at least 2 characters or more",
		});
		return false;
	}
	if (!data.email || !emailRegex.test(data.email)) {
		setError({ email: true, message: "Please enter a valid email id" });
		return false;
	}
	if (!data.password || data.password.length < 5) {
		setError({
			password: true,
			message: "Password must be at least 5 characters or more",
		});
		return false;
	}
	return true;
};

const AuthPage = ({ registerPage }) => {
	const [data, setData] = useState({});
	const [error, setError] = useState({});
	const [loading, setLoading] = useState(false);

	const { isLoggedIn } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const welcomeMessage =
		(registerPage ? "Register" : "Login") + " to access the application";

	const handleInputChange = (key, value) => {
		const newData = { ...data, [key]: value };
		setData(newData);
		if (error.message) {
			const isValid = validateData(newData, registerPage, setError);
			if (isValid) setError({});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (loading) return;
		const isValidData = validateData(data, registerPage, setError);

		if (isValidData) {
			setLoading(true);
			const [result, error] = await postData(
				`${registerPage ? USER_ROUTES.REGISTER : USER_ROUTES.LOGIN}`,
				data
			);			

			setLoading(false);
			if (result?.success) {
				toast.success(result.message);
				if (registerPage) return navigate("/login");
				else {
					dispatch(setIsLoggedIn(true));
					dispatch(setUser(result.user));
					return navigate("/chat");
				}
			} else {
				setError({
					message:
						error.response.data.message ||
						error.message ||
						"Something went wrong",
				});
				toast.error(
					error.response.data.message ||
						error.message ||
						"Something went wrong"
				);
			}
		}
	};

	//to cleanup the previous states
	useEffect(() => {
		return () => {
			setError({});
			setData({});
		};
	}, [registerPage]);

	if (isLoggedIn) return <Navigate to={"/"} />;

	return (
		<div className="flex items-center justify-center h-screen w-screen bg-backgroundGradient">
			<div className="p-[22px] shadow-shadowCard rounded-[8px] bg-white">
				<div className="bg-bannerGradient bg-clip-text text-transparent text-[32px] font-bold text-center">
					We Chat
				</div>
				<div
					className={`${
						error.message ? "text-[#f84949]" : "text-[#747373]"
					} text-[13px]  my-4  text-center`}>
					{error.message || welcomeMessage}
				</div>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center justify-center w-[320px]">
					{registerPage && (
						<InputComponent
							placeholder="Name"
							type="text"
							tag="userName"
							label="Name"
							value={data?.userName || ""}
							error={error.userName}
							handleInputChange={handleInputChange}
						/>
					)}

					<InputComponent
						placeholder="Email Id"
						type="email"
						tag="email"
						label="Email"
						value={data?.email || ""}
						error={error.email}
						handleInputChange={handleInputChange}
						autoComplete={"email"}
					/>

					<InputComponent
						placeholder="Password"
						type="password"
						tag="password"
						label="Password"
						value={data?.password || ""}
						error={error.password}
						handleInputChange={handleInputChange}
					/>

					<button
						className={`bg-bannerGradient rounded-md p-2 mt-[20px]  flex items-center justify-center text-white w-full ${
							loading
								? "cursor-not-allowed active:scale-100"
								: "cursor-pointer active:scale-95"
						}`}
						type={"submit"}>
						{loading ? (
							<Loader loaderColor="white" />
						) : (
							<>
								<span className="border-0 border-black">
									{registerPage ? "Register" : "Login"}
								</span>
								<FaArrowRightLong className=" border-0 ml-2 text-xs mt-[2px] border-black" />
							</>
						)}
					</button>
				</form>

				<div className="flex items-center mt-5 justify-center text-[14px]">
					{registerPage
						? "Already have an account, go to  "
						: "Don't have an account "}
					<Link
						to={registerPage ? "/login" : "/register"}
						className="ml-1 text-[#7e7e7e] font-semibold hover:text-[#1e1e1e] hover:underline">
						{registerPage ? "Login Page" : "Register here"}
					</Link>
				</div>

				<div className="flex items-center justify-center my-4 text-[12px] text-[#767676] font-light ">
					{" "}
					<FaLock className="mr-2 text-[10px]" /> All messages are
					end-to-end encrypted
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
