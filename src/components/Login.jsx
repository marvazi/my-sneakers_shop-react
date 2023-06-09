import React from 'react';
import Form from './Form';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../store/slices/userSlice';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const handleLogin = (email, password) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        localStorage.setItem('user', JSON.stringify(user));
        push('/');
      })
      .catch(console.error);
  };

  return (
    <div className="main-div">
      <Form title="Войти" handleClick={handleLogin}></Form>
    </div>
  );
};

export default Login;
