import React, { useState } from "react";
import Button from "../common/Button/Button";
import Input from "../common/Input";
import Checkbox from "../common/Checkbox";

import { useDispatch } from "react-redux";
import { signIn } from "../../Store/UserStore";
import ToastNotification from "../common/ToastNotification/ToastNotification";
import { ToastTypes } from "../common/Toast/Toast";
import useDeviceType, { DEVICE_TYPE } from "../../Utils/deviceType";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deviceType = useDeviceType();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    } else {
      setEmail("");
      setPassword("");
      
      dispatch(signIn({ email, password }));
      navigate('/home');
    }
  };

  return (
    <ToastNotification
      props={{
        message: "",
        type: ToastTypes.ERROR,
        toastId: new Date().getTime(),
      }}
    >
      <div className="overflow-hidden">
        <div className="container h-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-full  ">
            <div className="lg:w-2/5 h-full  px-4 lg:px-16 py-5  flex flex-col justify-between">
              <header className="text-start ">
                <img
                  src="/asset/logo/shape.svg"
                  alt="Logo"
                  className="w-20 h-10"
                />
              </header>
              <div>
                <div className="text-start">
                  <h2 className="text-6xl font-bold mb-2">Login</h2>
                  <p className="text-[14px] leading-[20px]">
                    Sign in with your data that you entered during your
                    registration.
                  </p>
                </div>

                <div className="w-full mt-8">
                  <form className="flex flex-col gap-2">
                    <Input
                      type="email"
                      id="email"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      type="password"
                      id="password"
                      label="Password"
                      icon={<img src="/asset/icons/eye_on.svg" alt="eye" />}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Checkbox
                      label="Keep me logged in"
                      checked={false}
                      onChange={() => {}}
                    />

                    <div className="flex mt-10 flex-col gap-2">
                      <Button
                        variant="primary"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Login
                      </Button>
                      <Button variant="secondary">Forgot Password</Button>
                    </div>
                  </form>
                </div>
              </div>

              <footer className="text-center mb-8">
                <p>
                  Don't have an account? &nbsp;
                  <a href="/register" className="sign-up">
                    Sign up
                  </a>
                </p>
              </footer>
            </div>
            {deviceType === DEVICE_TYPE.DESKTOP && (
              <div className="flex-grow h-full relative p-4 scrollbar-hide">
                <div className="absolute top-0 left-0 w-screen h-screen overflow-visible scrollbar-hide login-banner">
                  <div className="relative w-3/5 p-6 h-full ">
                    <div className="absolute top-[48px] left-[100px] reviews-banner">
                      <img src="/asset/images/Login/reviews.svg" alt="Login" />
                    </div>

                    <div className="absolute top-[420px] horizontal-banner">
                      <img
                        src="/asset/images/Login/horizontal.svg"
                        alt="Login"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute lg:right-10 top-[90px] squared-banner">
                        <img
                          src="/asset/images/Login/squared.svg"
                          alt="Login"
                        />
                      </div>
                    </div>

                    <div className="absolute lg:left-10 bottom-[90px] h-[244px] flex flex-col justify-center items-center w-full">
                      <div className="review-label  flex   items-center p-2 align-center justify-center">
                        Leave reviews for all meals
                      </div>
                      <div className="review-description break-words">
                        Lorem ipsum dolor sit amet, magna scaevola his ei. Cum te paulo probatus molestiae, eirmod assentior eum ne, et omnis antiopam mel.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToastNotification>
  );
};

export default Login;
