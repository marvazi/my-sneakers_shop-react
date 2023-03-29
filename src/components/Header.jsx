import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context';

function Header(props) {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex aling-center">
          <img width={40} height={40} src="/img/logo.png"></img>
          <div className="headerInfo">
            <h3 className="text-uppercase">Forces 1 OV 7</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg"></img>

          <span>{totalPrice} руб.</span>
        </li>
        <li className="mr-15 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src="/img/favorites.svg"></img>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src="/img/user.svg"></img>
          </Link>
        </li>
      </ul>
    </header>
  );
}
export default Header;
