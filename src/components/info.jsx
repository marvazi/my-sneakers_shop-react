import React from 'react';
import AppContext from '../context';

const Info = ({ imageUrl, title, description }) => {
  const { setCardOpened } = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width={120} height={120} src={imageUrl} alt="" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCardOpened(false)} className="greenButton">
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
