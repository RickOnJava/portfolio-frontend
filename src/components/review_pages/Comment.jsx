/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div
      className={`my-2 flex items-center ${
        user?._id === comment?.author?._id ? "justify-end" : ""
      }`}
    >
      {user?._id === comment?.author?._id ? (
        <div className="flex gap-3 items-center">
          <h1 className="font-bold text-sm">
            <span className="font-normal pr-2">{comment?.text}</span>
            {comment?.author?.username}
          </h1>
          <Avatar>
            <AvatarImage src={comment?.author?.profilePicture} />
            <AvatarFallback>
              {comment?.author?.fullname?.split(" ").map((word) => word[0]).join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={comment?.author?.profilePicture} />
            <AvatarFallback>
              {comment?.author?.fullname?.split(" ").map((word) => word[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <h1 className="font-bold text-sm">
            {comment?.author?.username}
            <span className="font-normal pl-1">{comment?.text}</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default Comment;
