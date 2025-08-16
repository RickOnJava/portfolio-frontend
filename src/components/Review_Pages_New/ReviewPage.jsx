import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./StarRating";
import { ReviewCard } from "./ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";
import { toast } from "sonner";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import { InfiniteMovingCards2 } from "../ui/InfiniteMovingCards";
import { testimonials } from "../../../data/index";
import { Link, useNavigate } from "react-router-dom";


export default function ReviewPage() {
  useGetAllPost();
  useGetSuggestedUsers();

  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);

  const reversedPosts = [...posts].reverse(); // show the newest post first

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate average rating
    const total = posts.reduce((acc, post) => acc + post.rating, 0);
    setAverageRating(total / posts.length);
  }, [posts]);

  const createPostHandler = async () => {
    try {
      setIsSubmitting(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/addpost`,
        { caption, rating }, // use {} as we send as json object
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setPosts([...posts, res.data.post])); // without reloading page show the post upon create it

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setCaption("");
      setRating(0);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-5xl py-10 px-4 md:py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between mb-10"
      >
        <button
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => navigate("/")}
        >
          Go To Main Page
        </button>
       
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="h-11 w-11 shadow-lg shadow-purple-400">
            <AvatarImage src={user?.profilePicture} alt={user?.fullname} />
            <AvatarFallback>
              {user?.fullname
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Link>
      </motion.div>

      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
            Client Reviews
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            See what others are saying about working with me. I appreciate all
            feedback!
          </p>

          <div className="flex items-center justify-center mt-8">
            <motion.div
              className="flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-300"
                        : "text-gray-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xl font-bold text-white">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-purple-200">({posts?.length} reviews)</span>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-md">
              Recent Reviews
            </h2>
            <div className="space-y-6 lg:w-[32vw] lg:max-h-[65vh] lg:overflow-y-auto lg:overflow-x-hidden lg:p-2.5">
              <AnimatePresence>
                {reversedPosts?.map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ReviewCard post={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="order-1 md:order-2"
          >
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Leave a Review
                </h2>
                <div className=" flex gap-3 items-center mb-6">
                  <Avatar>
                    <AvatarImage src={user?.profilePicture} alt="img" />
                    <AvatarFallback>
                      {user?.fullname
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className=" font-semibold text-base text-white">
                      {user?.fullname}
                    </h1>
                    <span className=" text-sm text-white-100">{user?.bio}</span>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-100">
                      Rating
                    </label>
                    <StarRating rating={rating} setRating={setRating} />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="comment"
                      className="text-sm font-medium text-purple-100"
                    >
                      Your Review
                    </label>
                    <Textarea
                      id="comment"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Share your experience..."
                      rows={4}
                      required
                      className="bg-white/20 border-white/10 text-white placeholder:text-purple-200/70 focus:border-purple-300"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-none shadow-lg shadow-purple-900/30"
                    disabled={isSubmitting || !caption || rating === 0}
                    onClick={createPostHandler}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl mt-16 md:text-6xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
          Our Connections
        </h1>
        <p className="text-xl text-purple-100 max-w-2xl mx-auto">
          See How many people are connected with Us like You!
        </p>
      </motion.div>

      <div className="flex flex-col items-center max-lg:mt-10 ">
        <InfiniteMovingCards2
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
}
