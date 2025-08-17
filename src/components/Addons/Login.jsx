import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/MyButton";
import {  useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setIsAuthenticated, setToken } from "@/redux/authSlice.js";
import Spline from '@splinetool/react-spline';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const {isAuthenticated} = useSelector(store=>store.auth);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {

        dispatch(setIsAuthenticated(true));
        dispatch(setAuthUser(res.data.user)); // we have passed in backend the user , we get this here
        dispatch(setToken(res.data.token));

        toast.success(res.data.message);
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if(isAuthenticated){
    return <Navigate to={"/"} />;
  }


  return (
    <div className="w-screen h-screen flex items-center justify-around">
      <form
        className="shadow-lg flex flex-col gap-5 p-8 md:w-[30%]"
        onSubmit={signupHandler}
      >
        <div className="my-4">
          <h1 className="text-center font-bold md:text-2xl text-xl">
            Dynamic Portfolio
          </h1>
          <p className="text-center mt-1.5">Login (Welcome Back)</p>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent mt-2"
            autoComplete="off"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent mt-2"
          />
        </div>

        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )
        }

        <span className="text-center">
          Don&apos;t have an account?
          <Link to="/signup" className="font-bold text-blue-700">
            &nbsp; Create Now
          </Link>
        </span>
      </form>

      <div className="w-[45%] h-[100%] hidden md:block">
      <Spline scene="https://prod.spline.design/v82N86znvEGdUJc7/scene.splinecode" />
    </div>

    </div>
  );
};

export default Login;
