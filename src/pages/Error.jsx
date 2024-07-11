import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/posts", { state: 'Not found error'
      })

    }, 1000);
  }, [navigate]);
  return (
    <h1 style={{
      color: 'red'
    }}>
      This page does not exist
    </h1>
  );
};

export default Error;