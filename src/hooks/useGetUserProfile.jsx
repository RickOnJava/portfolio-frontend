import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@/redux/authSlice";

 const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${userId}/profile`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
    
  }, [userId]);
};

export default useGetUserProfile;