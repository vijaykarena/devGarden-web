import { Outlet, useNavigate } from "react-router";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
import { BASE_URL } from "./utils/constants";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status == 401) navigate("/login");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
