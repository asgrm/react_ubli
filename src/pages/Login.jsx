import React, { useContext } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const {setIsAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', true);
    navigate('/posts');
  }
  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={login}>
        <MyInput type='text' placeholder='Enter login'/>
        <MyInput type='password' placeholder='Enter password'/>
        <MyButton>Log In</MyButton>
      </form>

    </div>
  );
};

export default Login;