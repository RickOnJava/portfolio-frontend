import {  useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CreatePost = ({ open, setOpen }) => {


  const [caption, setCaption] = useState("");

  const [loading, setLoading] = useState(false);

  const {user} = useSelector(store => store.auth);
  const {posts} = useSelector(store => store.post);

  const dispatch = useDispatch();

  const createPostHandler = async () => {

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/addpost`,
        { caption }, // use {} as we send as json object
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if(res.data.success) {

        dispatch(setPosts([ ...posts , res.data.post])) // without reloading page show the post upon create it
        
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
        setLoading(false);
        setOpen(false);
    }
  };


  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="text-center font-bold">
          Create New Post
        </DialogHeader>
        <div className=" flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>{user?.fullname.split(" ").map(word => word[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className=" font-semibold text-sm">{user?.username}</h1>
            <span className=" text-xs text-gray-600">{user?.bio}</span>
          </div>
        </div>

        <Textarea
          className="focus-visible:ring-transparent border-none"
          placeholder="Right a Review..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />


        {
          (loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button
              onClick={createPostHandler}
              type="submit"
              className="w-full"
            >
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
