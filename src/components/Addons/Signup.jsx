import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/MyButton";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Spline from "@splinetool/react-spline";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    verificationMethod: "",
  });

  const {isAuthenticated} = useSelector(store=>store.auth);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    input.phone = `+91${input.phone}`;

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/otp-verification/${input.email}/${input.phone}`);
        setInput({
          fullname: "",
          username: "",
          email: "",
          password: "",
          gender: "",
          phone: "",
          verificationMethod: "",
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
    <div className="w-screen h-screen flex items-center justify-around overflow-x-hidden">
      <form
        className="shadow-lg flex flex-col gap-5 p-8 md:w-[30%]"
        onSubmit={signupHandler}
      >
        <div className="my-4">
          <h1 className="text-center font-bold md:text-2xl text-xl">
            Dynamic Portfolio
          </h1>
          <p className="text-center mt-1.5">Signup to connect to the world</p>
        </div>
        <div>
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullname"
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent mt-2"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold mb-2">Gender</h1>
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
          </div>

          <div>
            <h1 className="font-semibold mb-2">Verfication Method</h1>
            <div className="flex justify-between items-center">
              <label>
                <input
                  type="radio"
                  name="verificationMethod"
                  value={"email"}
                  onChange={changeEventHandler}
                  required
                />
                Email
              </label>
              {/* <label>
                <input
                  type="radio"
                  name="verificationMethod"
                  value={"phone"}
                  onChange={changeEventHandler}
                  required
                />
                Phone
              </label> */}
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent mt-2"
            autoComplete="off"
          />
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
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="number"
            name="phone"
            value={input.phone}
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
          <Button type="submit">SignUp</Button>
        )}

        <span className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-700">
            Login
          </Link>
        </span>
      </form>

      <div className="w-[45%] h-[100%] hidden md:block">
      <Spline scene="https://prod.spline.design/v82N86znvEGdUJc7/scene.splinecode" />
    </div>
    </div>
  );
};

export default Signup;
