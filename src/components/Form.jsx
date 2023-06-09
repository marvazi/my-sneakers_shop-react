import React from 'react';
import { useState } from 'react';

const Form = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div className="main-div">
      <div className="enter-form">
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="form-input"
          />
          {email.includes('@') == false ? (
            <span className="error">Адрес должен содержать символ '@'</span>
          ) : (
            ''
          )}
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="password"
            className="form-input"
          />
          {pass.length < 8 ? (
            <span className="error">
              пароль должен составлять минимум 8 символов
            </span>
          ) : (
            ''
          )}
        </div>

        <button
          className="form-button"
          disabled={email == 0 && pass.length < 8 ? true : false}
          onClick={() => handleClick(email, pass)}
        >
          {title}
        </button>
      </div>
    </div>
  );
};

export default Form;
