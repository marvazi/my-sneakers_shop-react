import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { removeUser } from '../store/slices/userSlice';
import { CiLogout } from 'react-icons/ci';
function Header(props) {
  const { isAuth, email } = useAuth();
  const { cartItems } = React.useContext(AppContext);
  const dispatch = useDispatch();
  //Функция подсчета итогой суммы на главной странице
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  //Верстка компонента header
  return (
    <header className="d-flex justify-between align-center p-40">
      {/* Использование Link для быстрого перехода между страницами */}
      <Link to="/">
        <div className="d-flex aling-center">
          <img width={40} height={40} src="/img/logo.png"></img>
          <div className="headerInfo">
            <h3 className="text-uppercase">Forces 1 OV 7</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      {isAuth ? (
        <ul className="d-flex">
          <li className="mr-30 cu-p">
            <CiLogout
              className=""
              onClick={() => dispatch(removeUser())}
              width={18}
              height={18}
              src="/img/cart.svg"
            ></CiLogout>

            <span>{email}</span>
          </li>
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
      ) : (
        <li className="mr-30 cu-p">
          <img
            onClick={() => dispatch(removeUser())}
            width={18}
            height={18}
            src="/img/cart.svg"
          ></img>

          <span>
            <Link to="/reg">{isAuth ? 'Выйти' : 'Войти'}</Link>
          </span>
        </li>
      )}
    </header>
  );
}
export default Header;
