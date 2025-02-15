import { setUser } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);
};

export default useAuth;
