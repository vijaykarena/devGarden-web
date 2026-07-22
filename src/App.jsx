import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Login from "./pages/Login";
import Feed from "./pages/Feed";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
