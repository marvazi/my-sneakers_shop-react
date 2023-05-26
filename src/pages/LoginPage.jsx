import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className="main-div">
      <h1>Авторизация</h1>
      <Login />
      <p>
        Нет аккаунта? <Link to="/reg">Зарегистрируйтесь</Link>
      </p>
    </div>
  );
};

export default LoginPage;
