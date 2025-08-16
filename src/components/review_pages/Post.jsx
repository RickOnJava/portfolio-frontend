/* eslint-disable react/prop-types */
import {  MessageCircle, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts, setSelectedPost, setUserWhoGiveLikes } from "@/redux/postSlice";
import { Badge } from "@/components/ui/badge";
import UserWhoGiveLikes from "./UserWhoGiveLikes";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false); // For message
  const [likeOpen, setLikeOpen] = useState(false); // To show who give likes

  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
 
  const [liked, setLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(post?.likes.length);
  const [comment, setComment] = useState(post?.comments);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/delete/${post?._id}`,
        { withCredentials: true }
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

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${post?._id}/${action}`,
        { withCredentials: true }
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

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${post?._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                comments: updatedCommentData,
              }
            : p
        );

        dispatch(setPosts(updatedPostData));

        toast.success(res.data.message);

        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post?.author?.profilePicture} alt="post_image" />
            <AvatarFallback>
              {post?.author?.fullname
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-3">
            <h1>{post?.author?.username}</h1>

            {user && user._id === post?.author?._id && (
              <Badge variant="secondary">Author</Badge>
            )}
          </div>
        </div>
        {
          user && user?._id === post?.author?._id && <Dialog>
          <DialogTrigger  className="ml-5" asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            
            {/* The user can only see delete button only in his post , not for others */}
            {user && user?._id === post?.author?._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className=" cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
        }
      </div>

      <p className="my-3 py-1 px-2 rounded-lg bg-gray-50">
        {post?.caption}
      </p>

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart
              size={"25px"}
              className=" cursor-pointer text-red-500"
              onClick={likeOrDislikeHandler}
            />
          ) : (
            <FaRegHeart
              size={"25px"}
              className=" cursor-pointer hover:text-gray-600"
              onClick={likeOrDislikeHandler}
            />
          )}

          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className=" cursor-pointer hover:text-gray-600"
          />
        </div>
      </div>

      <span 
      onClick={() => {
        setLikeOpen(true)
        dispatch(setUserWhoGiveLikes(post))
      }}
      className=" font-medium block mb-2 cursor-pointer">{postLikeCount} likes</span>
      <UserWhoGiveLikes open={likeOpen} setOpen={setLikeOpen} />

      {comment.length > 0 && (
        <span
          className=" cursor-pointer text-gray-400 text-sm"
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
        >
          View all {comment.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />

      <div className="flex justify-between items-center mt-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className=" outline-none text-sm w-full"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] font-semibold cursor-pointer px-1.5 py-0.5 rounded-sm hover:bg-[#dceaf4]"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;