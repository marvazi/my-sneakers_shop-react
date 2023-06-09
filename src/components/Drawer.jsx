import React, { useState } from 'react';
import Info from './info';
import axios from 'axios';
import useCart from '../hooks/useCart';
import Form from './Form';
import OrderForm from './OrderForm';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Drawer({ onCloseCart, onRemovedItem, items = [], opened }) {
  // Достаем необходимые пропсы
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [adress, setAdress] = useState('');

  const onClickOrder = async () => {
    try {
      const { data } = await axios.post(
        'https://646bcea77d3c1cae4ce44e01.mockapi.io/orders',
        {
          items: cartItems,
        }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          'https://63fe5fddc5c800a7238001c7.mockapi.io/cart/' + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
  };
  // Верстка компонента Drawer
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between ">
          Корзина{' '}
          <img
            onClick={onCloseCart}
            className="cu-p"
            src="/img/btnrem.svg"
            alt=""
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div className="cartItem d-flex align-center mb-20">
                  <img
                    className="mr-20"
                    width={80}
                    height={80}
                    src={obj.imageUrl}
                    alt=""
                  />
                  <div className="mr-20">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб .</b>
                  </div>
                  <img
                    onClick={() => onRemovedItem(obj.id)}
                    className="removeBtn"
                    src="/img/btnrem.svg"
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              {/* <Form></Form> */}
              <button onClick={onClickOrder} className="greenButton">
                Оформите заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={
              isOrderComplete ? (
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
                          value={adress}
                          onChange={(e) => setAdress(e.target.value)}
                          type="text"
                          placeholder="Введите адрес получателя"
                          className="form-input"
                        />
                      </div>

                      <button
                        onClick={() => setVisible(true)}
                        className="form-button"
                      >
                        Закзать
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                'Корзина пустая'
              )
            }
            description={
              isOrderComplete && visible == true
                ? `Ваш заказ #${orderId},по адресу:  ${adress} скоро буден передан курьеру`
                : ''
            }
            imageUrl={
              isOrderComplete ? '/img/complete-order.jpg' : '/img/empty.jpg'
            }
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
