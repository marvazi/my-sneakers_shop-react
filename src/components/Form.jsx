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
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="password"
            className="form-input"
          />
        </div>
        <button
          className="form-button"
          onClick={() => handleClick(email, pass)}
        >
          {title}
        </button>
      </div>
    </div>
  );
};

export default Form;
