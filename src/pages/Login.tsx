
import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { NavigationBar, Footer } from "../components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import useUserInfoStore from "../stores/UserInfoStore";



const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Binar Car Rental | Login";
  })

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleSubmit = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/login`, {
      email: email,
      password: password
    }).then((response) => {
      Cookies.set("token", response.data.data.token, { expires: 1 });
      axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${response.data.data.token}`
        }
      }).then((response) => {
        useUserInfoStore.setState({ name: response.data.data.name });
        navigate("/dashboard-admin");
      })
    }).catch((error) => {
      alert(error.response.data.message);
      console.log(error);
    })
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async ({code}) => {
      const tokens = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/users/auth/google`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          code
        }
      }).then((response) => {
        Cookies.set("token", response.data.data.token, { expires: 1 });
        axios({
          method: "GET",
          url: "https://openidconnect.googleapis.com/v1/userinfo",
          headers: {
            Authorization: `Bearer ${response.data.data.access_token}`,
          }
        }).then((response) => {
          useUserInfoStore.setState({ name: response.data.name });
          navigate("/dashboard");
        })
      }).catch((error) => {
        console.log(error);
      })
    },
    flow: 'auth-code',
    onError: error => console.log('Login Failed:', error),
  })

  return (
    <div>
      <NavigationBar />
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="Sample image" className="img-fluid" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with: </p>
                  <button type="button" className="btn border border-dark rounded-circle mx-1" onClick={() => loginWithGoogle()}>
                    <FontAwesomeIcon icon={faGoogle} />
                  </button>
                </div>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>
                <div className="form-outline mb-4">
                  <input
                    name="email"
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-outline mb-3">
                  <input
                    name="password"
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button onClick={handleSubmit}
                    type="button"
                    className="btn btn-light-green btn-lg"
                    style={{ paddingLeft: 2.5 + 'rem', paddingRight: 2.5 + 'rem' }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{' '}
                    <a href="#!" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Login

