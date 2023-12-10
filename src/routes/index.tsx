
import { useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

// pages
import { Home, Car, Login, Dashboard, DashboardAdmin } from "../pages";

import ProtectedAuth from "../auth/ProtectedAuth";
import HandleAfterLogin from "../auth/HandleAfterLogin";
import useUserInfoStore from "../stores/UserInfoStore";


export default function RouterPages() {

  const whoami = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        useUserInfoStore.setState({ name: response.data.data.name });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    whoami();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cars" element={<Car />}></Route>

        <Route path="/login" element={
          <HandleAfterLogin>
            <Login />
          </HandleAfterLogin>
        }></Route>
        <Route
          path="/dashboard-admin"
          element={
            <ProtectedAuth>
              <DashboardAdmin />
            </ProtectedAuth>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedAuth>
              <Dashboard />
            </ProtectedAuth>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
