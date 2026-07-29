import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [info, setInfo] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    photoUrl: user?.photoUrl,
    age: user?.age || "",
    gender: user?.gender || "",
    bio: user?.bio,
  });

  const inputHandler = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const editHandler = async () => {
    setError("");
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", info, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center m-10">
          <div className="card bg-base-300 w-96 shadow-sm ">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset border-base-300 p-4">
                  <label className="label">First name</label>
                  <input
                    type="text"
                    className="input"
                    name="firstName"
                    value={info.firstName}
                    onChange={inputHandler}
                  />

                  <label className="label">Last name</label>
                  <input
                    type="text"
                    className="input"
                    name="lastName"
                    value={info.lastName}
                    onChange={inputHandler}
                  />

                  <label className="label">Photo Url</label>
                  <input
                    type="text"
                    className="input"
                    name="photoUrl"
                    value={info.photoUrl}
                    onChange={inputHandler}
                  />

                  <label className="label">Age</label>
                  <input
                    type="text"
                    className="input"
                    name="age"
                    value={info.age}
                    onChange={inputHandler}
                  />

                  <label className="label">Gender</label>
                  <select
                    value={info.gender}
                    name="gender"
                    className="select"
                    onChange={inputHandler}
                  >
                    <option value="" disabled>
                      Pick a gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  <label className="label">Bio</label>
                  <textarea
                    className="textarea"
                    name="bio"
                    value={info.bio}
                    onChange={inputHandler}
                  ></textarea>

                  <p className="text-red-500">{error}</p>
                  <button
                    className="btn btn-neutral mt-4"
                    onClick={editHandler}
                  >
                    Save Profile
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={info} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
