import React from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../components/SignUp';

const RegisterPage = () => {
  return (
    <div className="main-div">
      <h1>Зарегистрироваться</h1>
      <SignUp />
      <p>
        Уже есть аккаунт? <Link to="/login">Авторизуйтесь</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
