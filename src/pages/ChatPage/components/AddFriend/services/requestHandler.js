import debounce from "lodash.debounce";
import axios from "axios";
import { getData } from "../../../../../services/getData.api";

const DEBOUNCE_DELAY = 500;

const fetchUsers = async (input, setFriends, setLoading) => {
	const [data, error] = await getData(`user/search?query=${input}`);

	setLoading(false);
    if(data) setFriends(data?.data);
    else console.log("error", error);
    
};

const debouncedFetch = debounce(fetchUsers, DEBOUNCE_DELAY);

const handleInputChange = (input, setQuery, setFriends, setLoading) => {
	setQuery(input);
	setLoading(true);
	debouncedFetch(input, setFriends, setLoading);
};

export { handleInputChange, debouncedFetch };
