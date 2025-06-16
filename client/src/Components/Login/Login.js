import React, { useState } from 'react';
import Button from '../common/Button/Button';
import Input from '../common/Input';
import Checkbox from '../common/Checkbox';

import { useDispatch } from 'react-redux';
import ToastNotification from '../common/ToastNotification/ToastNotification';
import { ToastTypes } from '../common/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import { setAuthData } from '../../utility/auth';
import './Login.css';
import useDeviceType, { DEVICE_TYPE } from '../../utility/deviceType';

const PageType = {
  SIGNIN: 'sign in',
  SIGNUP: 'sign up',
};

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pageType, setPageType] = useState(PageType.SIGNIN);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deviceType = useDeviceType();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      // Store the token and user data using the utility function
      setAuthData(data);

      // Reset form
      setEmail('');
      setPassword('');

      // Redirect to home or dashboard
      navigate('/home');

      // Optionally update app state if using context/redux
      // dispatch(signIn({ user: data.user, token: data.token }));
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (show error message to user)
      alert(error.message || 'Login failed. Please try again.');
    }
  };

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        // dispatch(signIn({ email, password }));
        // navigate("/home");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <ToastNotification
      props={{
        message: '',
        type: ToastTypes.ERROR,
        toastId: new Date().getTime(),
      }}
    >
      <div className="overflow-hidden">
        <div className="container h-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-full  ">
            <div className="lg:w-2/5 h-full  px-4 lg:px-16 py-5  flex flex-col justify-between">
              <header className="text-start ">
                <img src="/asset/logo/shape.svg" alt="Logo" className="w-20 h-10" />
              </header>
              {pageType === PageType.SIGNIN ? (
                <div>
                  <div className="text-start">
                    <h2 className="text-6xl font-bold mb-2">Login</h2>
                    <p className="text-[14px] leading-[20px]">
                      Sign in with your data that you entered during your registration.
                    </p>
                  </div>

                  <div className="w-full mt-8">
                    <form className="flex flex-col gap-2">
                      <Input
                        type="email"
                        id="email"
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <Input
                        type="password"
                        id="password"
                        label="Password"
                        icon={<img src="/asset/icons/eye_on.svg" alt="eye" />}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />

                      <Checkbox label="Keep me logged in" checked={false} onChange={() => {}} />

                      <div className="flex mt-10 flex-col gap-2">
                        <Button variant="primary" onClick={e => handleSubmit(e)}>
                          Login
                        </Button>
                        <Button variant="secondary">Forgot Password</Button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-start">
                    <h2 className="text-6xl font-bold mb-2">Sign Up</h2>
                    <p className="text-[14px] leading-[20px]">
                      Sign up by entering your personal details to create a new account.
                    </p>
                  </div>

                  <div className="w-full mt-8">
                    <form className="flex flex-col gap-2">
                      <Input
                        type="text"
                        id="name"
                        label="Full Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                      <Input
                        type="email"
                        id="email"
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <Input
                        type="password"
                        id="password"
                        label="Password"
                        icon={<img src="/asset/icons/eye_on.svg" alt="eye" />}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <Input
                        type="password"
                        id="confirmPassword"
                        label="Confirm Password"
                        icon={<img src="/asset/icons/eye_on.svg" alt="eye" />}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                      />

                      <div className="flex mt-10 flex-col gap-2">
                        <Button variant="primary" onClick={() => handleSignUp()}>
                          Sign Up
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <footer className="text-center mb-8 select-none">
                {pageType === PageType.SIGNIN ? (
                  <p>
                    Don't have an account? &nbsp;
                    <span
                      className="sign-up cursor-pointer"
                      onClick={() => setPageType(PageType.SIGNUP)}
                    >
                      Sign up
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account? &nbsp;
                    <span
                      className="sign-up cursor-pointer"
                      onClick={() => setPageType(PageType.SIGNIN)}
                    >
                      Sign In
                    </span>
                  </p>
                )}
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
                      <img src="/asset/images/Login/horizontal.svg" alt="Login" />
                    </div>
                    <div className="relative">
                      <div className="absolute lg:right-10 top-[90px] squared-banner">
                        <img src="/asset/images/Login/squared.svg" alt="Login" />
                      </div>
                    </div>

                    <div className="absolute lg:left-10 bottom-[90px] h-[244px] flex flex-col justify-center items-center w-full">
                      <div className="review-label  flex   items-center p-2 align-center justify-center">
                        Leave reviews for all meals
                      </div>
                      <div className="review-description break-words">
                        Lorem ipsum dolor sit amet, magna scaevola his ei. Cum te paulo probatus
                        molestiae, eirmod assentior eum ne, et omnis antiopam mel.
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
