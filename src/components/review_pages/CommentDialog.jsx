import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "sonner";
import { setPosts } from "@/redux/postSlice";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [comment, setComment] = useState([]);


  const { user, token } = useSelector((store) => store.auth);
  
  const { selectedPost, posts } = useSelector((store) => store.post);
  
  useEffect(() => {
    if(selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost])

  
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${selectedPost?._id}/comment`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if(res.data.success){

        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id
            ? {
                ...p,
                comments: updatedCommentData
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
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-xl p-0 flex flex-col "
      >
          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback>
                      {selectedPost?.author?.fullname
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-sm">
                    {selectedPost?.author?.username}
                  </Link>
                  <span className="text-gray-600 text-sm block">{selectedPost?.caption}</span>
                </div>
              </div>

            </div>
            <hr className="w-full" />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              {
                comment.map((comment) => <Comment key={comment._id} comment={comment}/>)
              }
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={text}
                  onChange={changeEventHandler}
                  className="outline-none w-full border border-gray-500 p-2 rounded"
                />
                <Button
                  disabled={!text}
                  onClick={sendMessageHandler}
                  variant="outline"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
