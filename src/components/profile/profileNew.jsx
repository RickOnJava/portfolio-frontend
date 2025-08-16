import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const params = useParams();
  const userId = params.id;

  useGetUserProfile(userId);

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const displayedPost = userProfile?.posts;

  return (
    <div className="flex max-w-6xl justify-center mx-auto pl-10">
      <div className=" flex flex-col gap-14 p-8">
        <div className=" grid grid-cols-2">
          <section className="flex items-center justify-center">
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
          </section>

          <section>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                {userProfile?.gender === "female" ? (
                  <IoMdFemale className=" text-pink-500 w-5 h-5" />
                ) : (
                  <IoMdMale className="text-blue-500 w-5 h-5" />
                )}
                <span className=" font-semibold text-lg mr-3">
                  {userProfile?.username}
                </span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8"
                      >
                        Edit Profile
                      </Button>
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="flex items-center gap-5">
                <p className="flex gap-1">
                  <span className="font-semibold">
                    {userProfile?.posts.length}
                  </span>
                  Posts
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge className="w-fit " variant="secondary">
                    <AtSign />
                    <span className="ml-1.5 font-semibold text-base">
                      {userProfile?.username}
                    </span>
                  </Badge>
                  <span className="font-bold flex items-center gap-1">
                    <FaUser /> {userProfile?.fullname}
                  </span>
                </div>

                <span className="font-semibold">
                  {userProfile?.bio || "Bio here..."}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Posts section-------------------------------------------------------------------------- */}
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span className={"py-3 cursor-pointer"}>POSTS</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {displayedPost?.length <= 0 ? (
              <h1 className="text-center">No Posts To Show</h1>
            ) : (
              displayedPost?.map((post) => {
                return (
                  <div
                    key={post?._id}
                    className="relative group cursor-pointer"
                  >
                    <p className="rounded-xl my-2 w-full bg-gray-50 px-2 py-3">
                      {post?.caption}
                    </p>

                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center text-white space-x-4">
                        <button className="flex items-center gap-2 hover:text-gray-300">
                          <Heart />
                          <span>{post?.likes.length}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-gray-300">
                          <MessageCircle />
                          <span>{post?.comments.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
