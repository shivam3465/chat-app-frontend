// src/hooks/useFetch.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const fetchData = async ({ queryKey }) => {
	const { url, method, data, credentials, headers } = queryKey[1];

	const apiURL = `${BASE_URL}/api/v1${url}`;
	const response = await axios({
		url: apiURL,
		method,
		data,
		withCredentials: credentials,
		headers,
	});
	return response.data;
};

const defaultHeaders = {
	"Content-Type": "application/json",
};

const useFetch = (
	key,
	{
		url,
		method = "GET",
		data = null,
		credentials = false,
		headers = defaultHeaders,
		stateKey = null, // Make stateKey optional
	}
) => {
    //if we need to refetch then provide the state key
	const queryKey = stateKey
		? [key, { url, method, data, credentials, headers, stateKey }]
		: [key, { url, method, data, credentials, headers }];
	return useQuery({
		queryKey,
		queryFn: fetchData,
		refetchOnWindowFocus: false,
		retry: false,
	});
};

export default useFetch;
