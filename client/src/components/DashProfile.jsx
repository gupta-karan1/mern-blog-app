import { useSelector } from "react-redux";
import { TextInput, Label, Button } from "flowbite-react";
import { HiUser, HiMail, HiLockClosed } from "react-icons/hi";

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">My Profile</h1>
      <form className="flex flex-col gap-5">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt={currentUser.username}
            className="rounded-full w-full h-full object-cover border-4 border-[lightgray] "
          />
        </div>

        <div>
          <Label htmlFor="username" value="Username" />
          <TextInput
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            sizing="lg"
            icon={HiUser}
          />
        </div>
        <div>
          <Label htmlFor="email" value="E-Mail" />
          <TextInput
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            sizing="lg"
            icon={HiMail}
          />
        </div>
        <div>
          <Label htmlFor="password" value="Password" />
          <TextInput
            type="text"
            id="password"
            placeholder="password"
            sizing="lg"
            icon={HiLockClosed}
          />
        </div>

        <Button
          type="submit"
          gradientDuoTone={"purpleToPink"}
          pill
          className="drop-shadow-md"
          size={"lg"}
        >
          Update{" "}
        </Button>
      </form>

      <div className="flex mt-10 justify-between flex-col md:flex-row gap-5">
        <Button pill gradientDuoTone={"purpleToPink"} size={"lg"} outline>
          Sign Out
        </Button>
        <Button pill gradientMonochrome="failure" outline size={"lg"}>
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default DashProfile;
