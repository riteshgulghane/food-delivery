import React, { useState } from "react";
import Button from "./common/Button/Button";
import Input from "./common/Input";
import Checkbox from "./common/Checkbox";

import { useDispatch } from "react-redux";
import { signIn } from "../Store/UserStore";
import ToastNotification from "./common/ToastNotification/ToastNotification";
import { ToastTypes } from "./common/Toast/Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    } else {
      setEmail("");
      setPassword("");
      dispatch(signIn({ email, password }));
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
      <div className="container h-screen h-full mx-auto ">
        <div className="flex w-full h-full items-center justify-center ">
          <div className="w-2/5 h-full px-16 py-5  flex flex-col justify-between">
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
                    <Button variant="primary" onClick={(e) => handleSubmit(e)}>
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
          <div className="flex-grow h-full  p-4">Two</div>
        </div>
      </div>
    </ToastNotification>
  );
};

export default Login;
