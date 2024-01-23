import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiMail, HiLockClosed, HiExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import {
  signInSuccess,
  signInFailure,
  signInStart,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password)
      return dispatch(signInFailure("Please fill in all fields"));

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 place-content-center p-2 md:p-20  ">
      {/* left */}
      <div className="bg-gradient-to-r from-indigo-500  to-pink-500 p-5 md:p-10 w-full h-full rounded-3xl self-center text-white">
        <span className="text-6xl xl:text-8xl font-black ">YouBlog</span>{" "}
        <p className=" text-xl lg:text-3xl mt-10">
          YouBlog is a blog platform where you can share your thoughts and ideas
          with the world. <br />
        </p>
      </div>

      {/* right */}
      <div>
        <form
          className="flex flex-col gap-5 p-5 md:p-0"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-semibold ">
            Welcome Back! <br /> Sign In to Your Account
          </h2>

          <div>
            <Label htmlFor="email" value="Your E-mail" className=" mb-2" />

            <TextInput
              id="email"
              type="email"
              icon={HiMail}
              placeholder="john@email.com"
              sizing="lg"
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="password" value="Your Password" className=" mb-2" />

            <TextInput
              id="password"
              type="password"
              icon={HiLockClosed}
              sizing="lg"
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            gradientMonochrome={"purple"}
            pill
            className="drop-shadow-md"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner color="white" size="sm" />
                <span className="ml-2">Signing In...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <OAuth />
        </form>

        <div className="mt-5 flex items-center gap-2 justify-center">
          <p className="">Need an account? </p>
          <Link
            to="/sign-up"
            className=" font-semibold underline-offset-2 underline"
          >
            Sign Up
          </Link>
        </div>

        {errorMessage && (
          <Alert className="mt-5" color="failure" icon={HiExclamationCircle}>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default SignIn;
