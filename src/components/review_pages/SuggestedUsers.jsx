import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);

  return (
    <div className="my-10">
      <div className="flex items-center gap-5 text-sm">
        <h1 className="font-semibold text-gray-600">Visitors Like You</h1>
      </div>

      {suggestedUsers?.length <= 0 ? (
        <h1 className="text-sm text-gray-500 mt-5">No Users</h1>
      ) : (
        suggestedUsers?.map((user) => {
          return (
            <div
              key={user?._id}
              className="flex items-center justify-between my-5"
            >
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
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">
                    {user?.bio || "Bio here..."}
                  </span>
                </div>
              </div>

            </div>
          );
        })
      )}
    </div>
  );
};

export default SuggestedUsers;
