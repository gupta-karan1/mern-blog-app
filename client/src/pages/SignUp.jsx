import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  HiMail,
  HiUser,
  HiLockClosed,
  HiExclamationCircle,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.username || !formData.password)
      return setErrorMessage("Please fill in all fields");

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);

      if (res.ok) {
        navigate("/sign-in");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 place-content-center p-10 md:p-20 bg-gradient-to-b from-indigo-500 to-pink-400 ">
      {/* left */}
      <div>
        <h2 className="text-6xl xl:text-9xl font-black  text-white mb-10">
          YouBlog
        </h2>{" "}
        <p className="text-white text-xl lg:text-3xl">
          YouBlog is a blog platform where you can share your thoughts and ideas
          with the world. <br />
        </p>
      </div>

      {/* right */}
      <div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold text-white">
            Sign Up to Get Started
          </h2>

          <div>
            <Label
              htmlFor="email"
              value="Your E-mail"
              className="text-white mb-2"
            />

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
            <Label
              htmlFor="username"
              value="Your Username"
              className="text-white mb-2"
            />

            <TextInput
              id="username"
              type="text"
              icon={HiUser}
              placeholder="johnDoe123"
              sizing="lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              value="Your Password"
              className="text-white mb-2"
            />

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
                <span className="ml-2">Signing Up...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="mt-5 flex items-center gap-2 justify-center">
          <p className="text-white">Already have an account? </p>
          <Link
            to="/sign-in"
            className="text-white font-semibold underline-offset-2 underline"
          >
            Sign In
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

export default SignUp;
