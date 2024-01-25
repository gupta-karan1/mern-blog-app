import { useSelector } from "react-redux";
import { TextInput, Label, Button, Alert } from "flowbite-react";
import { HiUser, HiMail, HiLockClosed, HiPencil } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const [formData, setFormData] = useState({});

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    /*
    service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*');
    }
  }
}
*/
    // console.log("uploading image...");

    setImageFileUploadError(null);
    setImageFileUploading(true);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageFileUploadError(
          "Could not upload image. File must be less than 2MB and of type JPG, PNG or GIF."
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({
            ...formData,
            profilePicture: downloadURL,
          });

          setImageFileUploading(false);
        });
      }
    );
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes to update.");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait while image is uploading...");
      return;
    }

    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully.");
        setTimeout(() => {
          setUpdateUserSuccess(null);
        }, 3000);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">My Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md  rounded-full relative"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && imageFileUploadProgress < 100 && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })})`,
                  strokeLinecap: "round",
                  transition: "stroke-dashoffset 0.5s ease 0s",
                },
              }}
            />
          )}

          <img
            src={
              imageFileUrl ||
              currentUser.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt={currentUser.username}
            className={`rounded-full w-full h-full object-cover border-4 border-gray-300 ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-50"
            }`}
          />
          <div className="p-2 bg-gray-300 bg-opacity-90 absolute top-0 right-0 rounded-full">
            <HiPencil className=" text-xl text-gray-500" />
          </div>
        </div>

        {imageFileUploadError && (
          <Alert color="failure" className="mt-5">
            {imageFileUploadError}
          </Alert>
        )}

        <div>
          <Label htmlFor="username" value="Username" />
          <TextInput
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            sizing="lg"
            icon={HiUser}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="password" value="Password" />
          <TextInput
            type="password"
            id="password"
            placeholder="password"
            sizing="lg"
            icon={HiLockClosed}
            onChange={handleInputChange}
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

      {updateUserSuccess && (
        <Alert
          color="success"
          className="mt-5"
          onDismiss={() => setUpdateUserSuccess(null)}
        >
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserError && (
        <Alert
          color="failure"
          className="mt-5"
          onDismiss={() => setUpdateUserError(null)}
        >
          {updateUserError}
        </Alert>
      )}

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
