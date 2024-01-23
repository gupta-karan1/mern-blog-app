import { Button, Label, TextInput } from "flowbite-react";
import { HiMail, HiUser, HiLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 place-content-center p-10 md:p-20 bg-gradient-to-b from-indigo-500   to-pink-400 ">
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
        <form className="flex flex-col gap-5">
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
              required
              sizing="lg"
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
              required
              sizing="lg"
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
              required
              sizing="lg"
            />
          </div>

          <Button
            type="submit"
            gradientMonochrome={"purple"}
            pill
            className="drop-shadow-md"
          >
            Sign Up
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
      </div>
    </div>
  );
}

export default SignUp;
