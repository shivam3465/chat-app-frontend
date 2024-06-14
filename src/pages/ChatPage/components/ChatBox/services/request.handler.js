import { toast } from "react-toastify";
import { getData } from "../../../../../services/getData.api";
import {
	setMessageLoading,
	setMessageObj,
} from "../../../../../redux/slice/message.slice";

const fetchAllMessages = async (conversationID, dispatch, prevMessages) => {
	dispatch(setMessageLoading(true));
	const [data, error] = await getData(`message/${conversationID}`);

	if (data) {
		dispatch(
			setMessageObj({ ...prevMessages, [conversationID]: data.messages })
		);
		dispatch(setMessageLoading(false));
	} else {
		console.log(error);
		toast.error(
			error.response.data.message ||
				error.message ||
				"Message fetch failed"
		);
	}
};

export { fetchAllMessages };
