import React from 'react';
import Form from './Form';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const SignUp = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const handleReg = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        push('/');
      })

      .catch(console.error);
  };
  return (
    <div>
      <Form title="Зарегистрироваться" handleClick={handleReg}></Form>
    </div>
  );
};

export default SignUp;
