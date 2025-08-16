import {
  Home,
  LogOut,
  PlusSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthUser,
  setIsAuthenticated,
  setSelectedUser,
  setSuggestedUsers,
  setUserProfile,
} from "@/redux/authSlice.js";
import { useState } from "react";
import CreatePost from "./CreatePost";
import {
  setPosts,
  setSelectedPost,
  setUserWhoGiveLikes,
} from "@/redux/postSlice";

const LeftSideBar = () => {
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        dispatch(setUserWhoGiveLikes(null));
        dispatch(setSelectedUser(null));
        dispatch(setSuggestedUsers([]));
        dispatch(setUserProfile(null));
        dispatch(setIsAuthenticated(false));

        navigate("/login");

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const createPostHandler = () => {
    setOpen(true);
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      createPostHandler();
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Message") {
      navigate("/chat");
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>
            {user?.fullname
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className=" flex flex-col ">
        <h1 className="my-8 pl-3 font-bold text-xl">DYNAMIC-REVIEW</h1>
        <div>
          {sidebarItems.map((item, index) => {
            return (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
              >
                {item.icon}
                <span>{item.text}</span>
               
              </div>
            );
          })}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSideBar;
