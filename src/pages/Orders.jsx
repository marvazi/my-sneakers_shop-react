import axios from 'axios';
import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

import { Link } from 'react-router-dom';
function Orders() {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  //Сохраннеие заказов
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://646bcea77d3c1cae4ce44e01.mockapi.io/orders'
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);

  // Вертска компонента Orders
  return (
    <div className="content p-40">
      <div className="d-flex mb-40 justify-between align-center">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {orders.map((item, title) => (
          <Card {...item} key={title} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
