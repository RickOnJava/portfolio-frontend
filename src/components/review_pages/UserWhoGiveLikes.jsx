/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const UserWhoGiveLikes = ({ open, setOpen }) => {
  const [likes, setLikes] = useState([]);

  const { user, token } = useSelector((store) => store.auth);

  const { userWhoGiveLikes } = useSelector((store) => store.post);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${
          userWhoGiveLikes?._id
        }/likes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setLikes(res.data.usersWhoGiveLike);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userWhoGiveLikes) {
      fetchData();
      console.log(likes);
    }
  }, [userWhoGiveLikes]);

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-[25%] max-h-[50%] py-5 backdrop-blur-2xl bg-white/20 border border-white/10 shadow-xl "
      >
        <DialogHeader>
          <DialogTitle className="text-white-100">Likes From</DialogTitle>
          <DialogDescription>
            {likes.map((like) => {
              return (
                <div className=" max-h-full overflow-y-auto mt-1.5">
                  <div id={like._id} className="flex items-center gap-2 py-2">
                    <Avatar>
                      <AvatarImage
                        src={like?.profilePicture}
                        alt="post_image"
                      />
                      <AvatarFallback>
                        {like?.fullname
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-3">
                        <h1 className="text-purple-100 font-semibold">
                          <Link
                            className="hover:text-gray-300"
                            to={`/profile/${like._id}`}
                          >
                            {like?.fullname}
                          </Link>
                          {user && user._id === like._id && (
                            <Badge className="ml-2" variant="secondary">
                              You
                            </Badge>
                          )}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserWhoGiveLikes;
