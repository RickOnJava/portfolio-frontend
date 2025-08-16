import { useSelector } from "react-redux";

const LoadingFallback = () => {

  const { user } = useSelector((store) => store.auth);

  return (
    <div className=" h-screen w-screen flex items-center justify-center">
        <h1 className="font-medium text-3xl">Hello , <span className="text-myPurple-100 font-semibold">{user?.fullname}</span>  </h1>
    </div>
  );
};

export default LoadingFallback;
