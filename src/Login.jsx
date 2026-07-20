import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("vijay@gmail.com");
  const [password, setPassword] = useState("Vijay@123");

  const loginHandler = async () => {
    const response = await axios.post(
      "http://localhost:8080/login",
      {
        emailId,
        password,
      },
      { withCredentials: true },
    );
    console.log(response);
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset border-base-300 p-4">
              <label className="label">Email ID</label>
              <input
                type="email"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-neutral mt-4" onClick={loginHandler}>
                Login
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
