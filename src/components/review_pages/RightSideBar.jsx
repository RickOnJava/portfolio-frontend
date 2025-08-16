import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const RightSideBar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="w-fit py-10 pr-36">
      <div className="sticky top-10">
        <div className="flex items-center gap-2">
          <Link to={`/profile/${user?._id}`}>
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="post_image" />
              <AvatarFallback>
                {user?.fullname
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Link>

          <div>
            <div className="flex items-center gap-3">
              <h1>
                <Link
                  className="hover:text-gray-600"
                  to={`/profile/${user?._id}`}
                >
                  {user?.username}
                </Link>
              </h1>

              <Badge variant="secondary">You</Badge>
            </div>
            <span className="text-xs text-gray-500 font-semibold">
              {user?.bio || "Bio here..."}
            </span>
          </div>
        </div>

        <SuggestedUsers />
      </div>
    </div>
  );
};

export default RightSideBar;
