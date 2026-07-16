import { Outlet } from "react-router";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const Body = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
