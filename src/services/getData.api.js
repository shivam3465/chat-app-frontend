import axios from "axios";
import { BASE_URL } from "../utils/config";

//this will send get request to passed url
export const getData = async (url) => {
	const apiURL = `${BASE_URL}/api/v1/${url}`;
	try {
		const { data } = await axios.get(apiURL, {
			withCredentials: true,
			headers: { "Content-Type": "application/json" },
		});
		return [data, null];
	} catch (error) {
		return [null, error];
	}
};
