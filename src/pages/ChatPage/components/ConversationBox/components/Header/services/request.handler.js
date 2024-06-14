import { toast } from "react-toastify";
import { setIsLoggedIn, setLoading } from "../../../../../../../redux/slice/user.slice";
import { getData } from "../../../../../../../services/getData.api"

const logoutHandler = async (dispatch)=>{
    dispatch(setLoading(true));
    const [data,error]=await getData("user/logout");
    dispatch(setLoading(false));
    
    console.log(data,error);
    if(data.success) dispatch(setIsLoggedIn(false));
    else if(error) {
        console.log("error",error);
        toast.error(error.response.data.message || error.message || "Some error occured" );
    }    
}

export {logoutHandler};