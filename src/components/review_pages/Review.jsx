import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import { Outlet } from "react-router-dom";
import Feed from "./Feed";
import RightSideBar from "./RightSideBar";

const Review = () => {

  useGetAllPost();
  useGetSuggestedUsers();

  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RightSideBar />
    </div>
  );
};

export default Review;
