import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  localStorage.setItem('auth', true);
  useEffect(() => {
    if (isAuth) {
      localStorage.setItem('auth', true);
    } else {
      localStorage.removeItem('auth');
    }
  }, [isAuth]);

  const logout = () => {
    setIsAuth(false);
  }
  return (
    <nav className={'navbar'}>
      {isAuth && <MyButton onClick={logout}>Log out</MyButton>}
      <div className={'navbar__links'}>
        <Link className={'navbar__links'} to="/posts" >Posts</Link>
        <Link className={'navbar__links'} to="/about">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;