import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSignUp({ handleSignup, handleLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must contain 8 or more characters.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLoginClick = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      handleLogin(email, password);
      navigate('/addtodos');
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      handleSignup(email, password);
    }
  };

  return (
    <div class="mt-8 ">
      <div class="w-90% max-w-md m-auto">
        <h1 class="text-stone-950 text-[16px] font-bold text-start mb-2  ">Sign Up or Log In</h1>
        <form class=" w-100% mb-4">
          {emailError && (
            <div className="text-pink-800 text-[14px] font-normal">Please input a valid E-Mail</div>
          )}
          <div class="mb-2 w-100% relative">
            <input
              class=" w-90% h-[47px] px-[39px] py-3.5 bg-zinc-100 rounded-2xl shadow justify-start items-center gap-2 inline-flex shadow  w-100 rounded-2xl appearance-none border border-500  bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={handleEmailChange}
            />
            <div className="absolute top-[18px] left-4 w-4 h-4 rounded-full border border-rose-600 " />
          </div>
          {passwordError && (
            <div className="text-pink-800 text-[14px] font-normal">
              Please input a valid Password
            </div>
          )}
          <div class="mb-2  w-100% relative">
            <input
              class=" w-90% h-[47px] px-[39px] py-3.5 bg-zinc-100 rounded-2xl shadow justify-start items-center gap-2 inline-flex shadow  w-100 rounded-2xl appearance-none border border-500  bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="absolute top-[18px] left-4 w-4 h-4 rounded-full border border-rose-600 " />
          </div>
          <div class="flex items-center justify-end gap-[10px]">
            <button
              class="px-4 py-3.5 bg-zinc-100 rounded-2xl shadow flex-col justify-start items-start gap-2.5 inline-flex text-stone-950 text-[16px] font-normal"
              type="button"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              class="px-4 py-3.5 bg-rose-600 rounded-2xl shadow flex-col justify-start items-start gap-2.5 inline-flex text-zinc-100 text-[16px] font-medium"
              type="button"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
