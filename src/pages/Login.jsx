import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: info.emailId,
          password: info.password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  const signupHandler = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", info, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "SignUp"}
          </h2>
          <div>
            <fieldset className="fieldset border-base-300 p-4">
              {!isLogin && (
                <>
                  <label className="label">First name</label>
                  <input
                    type="text"
                    className="input"
                    value={info.firstName}
                    onChange={(e) =>
                      setInfo({ ...info, firstName: e.target.value })
                    }
                  />
                  <label className="label">Last name</label>
                  <input
                    type="text"
                    className="input"
                    value={info.lastName}
                    onChange={(e) =>
                      setInfo({ ...info, lastName: e.target.value })
                    }
                  />
                </>
              )}
              <label className="label">Email ID</label>
              <input
                type="email"
                className="input"
                value={info.emailId}
                onChange={(e) => setInfo({ ...info, emailId: e.target.value })}
              />

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                value={info.password}
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
              />
              <p className="text-red-500">{error}</p>
              <button
                className="btn btn-neutral mt-4"
                onClick={isLogin ? loginHandler : signupHandler}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </fieldset>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLogin((value) => !value)}
          >
            {isLogin ? "New User? Signup Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
