import { updateModal } from "../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  const requireAuth = (action) => {
    if (!isLoggedIn) {
      dispatch(updateModal(true));
    } else {
      action();
    }
  };

  return { requireAuth };
};

export default useAuth;

// function func(arFunc:()=>void){

// }