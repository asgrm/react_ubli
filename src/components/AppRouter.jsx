import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router/index';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';


const AppRouter = () => {
  const privateRouter = useRoutes(privateRoutes);
  const publicRouter = useRoutes(publicRoutes);
  const {isAuth, isLoading} = useContext(AuthContext)
  if (isLoading) {
    return <Loader/>
  }
  return (
    <>
      {isAuth ? privateRouter: publicRouter}
    </>
  );
};

export default AppRouter;