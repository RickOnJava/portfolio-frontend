import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { CiPhone } from "react-icons/ci";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Mail } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { setUserProfile } from "@/redux/authSlice";

const Profile = () => {
  const params = useParams();
  const userId = params.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useGetUserProfile(userId);

  const { userProfile, user, isAuthenticated, token } = useSelector(
    (store) => store.auth
  );

  const [liked, setLiked] = useState(false);
  const [userLikeCount, setUserLikeCount] = useState(
    userProfile?.hearts?.length
  );

  const isLoggedInUserProfile = user?._id === userProfile?._id;

  useEffect(() => {
    // Reset the liked state and like count when a new user is selected
    setLiked(userProfile?.hearts?.includes(user._id));
    setUserLikeCount(userProfile?.hearts?.length);
  }, [userProfile]);

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${
          userProfile?._id
        }/${action}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedLikes = liked ? userLikeCount - 1 : userLikeCount + 1;
        setUserLikeCount(updatedLikes);

        setLiked(!liked);

        // apne post ko update karunga
        const updatedUserData = {
          ...userProfile,
          hearts: liked
            ? userProfile?.hearts?.filter((id) => id !== user._id)
            : [...userProfile.hearts, user._id],
        };
        dispatch(setUserProfile(updatedUserData));

        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Cover Image */}
      <div
        className="h-48 w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=2000&q=80')",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="sm:flex sm:items-end sm:space-x-5">
          <div className="relative group">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt={userProfile?.fullname}
              />
              <AvatarFallback>
                {userProfile?.fullname
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <div className="flex gap-2 items-center">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {userProfile?.fullname}
                </h1>
                {userProfile?.gender === "female" ? (
                  <IoMdFemale className=" text-pink-500 w-5 h-5 " />
                ) : (
                  <IoMdMale className="text-blue-500 w-5 h-5 " />
                )}
              </div>

              <p className="text-gray-500">{userProfile?.username}</p>
            </div>
            <div className="mt-6 flex items-center flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              {isLoggedInUserProfile ? (
                <>
                  <Link to="/account/edit">
                    <button className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Edit Profile
                    </button>
                  </Link>
                </>
              ) : liked ? (
                <AiFillLike
                  size={"30px"}
                  className=" cursor-pointer text-red-500"
                  onClick={likeOrDislikeHandler}
                />
              ) : (
                <AiOutlineLike
                  size={"30px"}
                  className=" cursor-pointer hover:text-gray-600 text-white-100"
                  onClick={likeOrDislikeHandler}
                />
              )}
              <button
                className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => navigate("/portfolio/review")}
              >
                Go back
              </button>
            </div>
          </div>
        </div>

        <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">
            {userProfile?.fullname}
          </h1>
        </div>
      </div>

      <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          {/* Basic Info Section */}
          <div className="sm:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{userProfile?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CiPhone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{userProfile?.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AiOutlineLike className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{userLikeCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="sm:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About
              </h2>
              <p className="text-gray-600">
                {userProfile?.bio || "No Information"}
              </p>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
};
export default Profile;
