import axios from 'axios';
import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';
function Orders() {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://63f7f8c36b93730c1234a6a4.mockapi.io/orders'
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);
  return (
    <div className="content p-40">
      <div className="d-flex mb-40 justify-between align-center">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {orders.map((item) => (
          <Card {...item} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
