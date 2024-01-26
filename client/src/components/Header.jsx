import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/theme/themeSlice.js";
import { signoutSuccess } from "../../redux/user/userSlice.js";

function Header() {
  const path = useLocation();
  const location = path.pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
        // console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      // console.log(error.message);
      throw new Error(error.message);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-lg sm:text-xl font-bold dark:text-white"
      >
        <span className="px-3 py-3 bg-gradient-to-r from-indigo-500  to-pink-500 rounded-xl text-white">
          YouBlog
        </span>{" "}
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="Search blog"
          rightIcon={AiOutlineSearch}
          className="hidden md:inline"
        />
      </form>

      <Button className="w-12 h-10 md:hidden" color="gray" pill>
        <AiOutlineSearch className="w-6 h-6 text-gray-500" />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user profile image"
                img={currentUser.profilePicture}
                placeholderInitials={currentUser.username[0]}
                rounded="full"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">
                {currentUser.email}
              </span>
            </Dropdown.Header>

            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={location === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>

        <Navbar.Link active={location === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>

        <Navbar.Link active={location === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
