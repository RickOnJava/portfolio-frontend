import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MessageCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  setPosts,
  setSelectedPost,
  setUserWhoGiveLikes,
} from "@/redux/postSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import UserWhoGiveLikes from "../review_pages/UserWhoGiveLikes";
import CommentDialog from "../review_pages/CommentDialog";
import { Link } from "react-router-dom";

export function ReviewCard({ post }) {
  const { user, token } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);

  const [open, setOpen] = useState(false); // For message
  const [likeOpen, setLikeOpen] = useState(false); // To show who give likes

  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(post?.likes.length);
  const [comment, setComment] = useState(post?.comments);

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/delete/${post?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatedPostData));

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    // Reset the liked state and like count when a new post is loaded
    setLiked(post?.likes.includes(user._id));
    setPostLikeCount(post.likes.length);
  }, [post]);

  useEffect(() => {
    setComment(post?.comments);
  }, [post]);

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${
          post?._id
        }/${action}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedLikes = liked ? postLikeCount - 1 : postLikeCount + 1;
        setPostLikeCount(updatedLikes);

        setLiked(!liked);

        // apne post ko update karunga
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));

        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card className="overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border-2 border-purple-300 ring-2 ring-purple-500/30">
              <AvatarImage
                src={post?.author?.profilePicture}
                alt="post_image"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white">
                {post?.author?.fullname
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">
                  <Link
                    className="hover:text-purple-300 transition-colors"
                    to={`/profile/${post?.author?._id}`}
                  >
                    {post?.author?.fullname}
                  </Link>
                </h3>
                {user && user._id === post?.author?._id && (
                  <Badge variant="outline" className="text-white-100">
                    Author
                  </Badge>
                )}
                {/* The user can only see delete button only in his post , not for others */}
                {user && user?._id === post?.author?._id && (
                  <Button
                    onClick={deletePostHandler}
                    variant="ghost"
                    className=" cursor-pointer w-fit text-[#ff6c78] font-bold"
                  >
                    Delete
                  </Button>
                )}
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= post?.rating ? "text-yellow-300" : "text-gray-500"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-purple-100">{post?.caption}</p>

              <div className="flex items-center gap-3 pt-2">
                {liked ? (
                  <FaHeart
                    size={"23px"}
                    className=" cursor-pointer text-red-500"
                    onClick={likeOrDislikeHandler}
                  />
                ) : (
                  <FaRegHeart
                    size={"23px"}
                    className=" cursor-pointer hover:text-gray-600 text-white-100"
                    onClick={likeOrDislikeHandler}
                  />
                )}

                <MessageCircle
                  size={"23px"}
                  onClick={() => {
                    dispatch(setSelectedPost(post));
                    setOpen(true);
                  }}
                  className=" cursor-pointer hover:text-gray-600 text-white-100"
                />
              </div>

              <span
                onClick={() => {
                  setLikeOpen(true);
                  dispatch(setUserWhoGiveLikes(post));
                }}
                className=" font-medium block mb-2 cursor-pointer text-purple-200"
              >
                {postLikeCount} likes
              </span>
              <UserWhoGiveLikes open={likeOpen} setOpen={setLikeOpen} />

              {comment.length > 0 && (
                <span
                  className=" cursor-pointer text-purple-300 text-sm"
                  onClick={() => {
                    dispatch(setSelectedPost(post));
                    setOpen(true);
                  }}
                >
                  View all {comment.length} comments
                </span>
              )}

              <CommentDialog open={open} setOpen={setOpen} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
