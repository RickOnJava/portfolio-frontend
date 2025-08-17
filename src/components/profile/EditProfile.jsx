import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useCallback, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { ImagePlus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";
import { useImageUpload } from "../hooks/use-image-upload";

const EditProfile = () => {
  const imageRef = useRef();
  const { user, token } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const previewRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { fileInputRef, handleThumbnailClick } = useImageUpload();
  const currentImage = previewUrl || user?.profilePicture;

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture,
    bio: user?.bio || "",
    username: user?.username || "",
    fullname: user?.fullname || "",
    gender: user?.gender || "",
  });

  const fileChangeHandler = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePhoto: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      previewRef.current = url;
    }
  });

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async () => {
    // console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("username", input.username);
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePhoto) {
      formData.append("profilePicture", input.profilePhoto);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile/edit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedUserData = {
          ...user,
          fullname: res.data.user?.fullname,
          username: res.data.user?.username,
          bio: res.data.user?.bio,
          profilePicture: res.data.user?.profilePicture,
          gender: res.data.user?.gender,
        };
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-2xl mx-auto pl-10 py-10">
      <section className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-xl">Edit Profile</h1>

        <div className="flex items-center bg-gray-100 rounded-xl p-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="-mt-10 px-6">
              {/* Avatar Code */}
              <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
                {currentImage && (
                  <img
                    src={currentImage}
                    className="h-full w-full object-cover"
                    width={80}
                    height={80}
                    alt="Profile image"
                  />
                )}
                <button
                  type="button"
                  className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                  onClick={handleThumbnailClick}
                  aria-label="Change profile picture"
                >
                  <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={fileChangeHandler}
                  className="hidden"
                  accept="image/*"
                  aria-label="Upload profile picture"
                />
              </div>
            </div>

            <div>
              <h1 className="font-bold text-sm">{user?.username}</h1>
              <span className=" text-gray-500">{user?.bio || ""}</span>
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-lg mb-2">Full Name</h1>
          <Textarea
            name="fullname"
            value={input.fullname}
            onChange={(e) => setInput({ ...input, fullname: e.target.value })}
            className="focus-visible:ring-transparent resize-none"
          />
        </div>
        <div>
          <h1 className="font-bold text-lg mb-2">Username</h1>
          <Textarea
            name="username"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
            className="focus-visible:ring-transparent resize-none"
          />
        </div>
        <div>
          <h1 className="font-bold text-lg mb-2">Bio</h1>
          <Textarea
            name="bio"
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            className="focus-visible:ring-transparent resize-none"
          />
        </div>
        <div>
          <h1 className="font-bold mb-2">Gender</h1>
          <Select
            defaultValue={input.gender}
            onValueChange={selectChangeHandler}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Your Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {(!input.gender || input.gender === "") && (
            <p className="text-red-500 text-sm mt-1">
              Please select your gender
            </p>
          )}
        </div>
        <div className="flex justify-end gap-5">
          <button
            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => navigate(`/profile/${user?._id}`)}
          >
            Go Back
          </button>
          {loading ? (
            <Button className="w-fit bg-[#0095F6] hover:bg-[#318bc7]">
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              onClick={editProfileHandler}
              className="w-fit bg-[#0095F6] hover:bg-[#318bc7]"
            >
              Submit
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
