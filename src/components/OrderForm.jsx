import React from 'react';

const OrderForm = () => {
  return (
    <div>
      <div className="main-div">
        <div className="enter-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Введите ФИО получателя"
              className="form-input"
            />
            <input
              type="phone"
              placeholder="Введите номер телефона получателя"
              className="form-input"
            />
            <input
              type="email"
              placeholder="Введите почту получателя"
              className="form-input"
            />

            <input
              type="text"
              placeholder="Введите адрес получателя"
              className="form-input"
            />
          </div>

          <button className="form-button">Закзать</button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
