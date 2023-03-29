import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCardOpened] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      const cartRespone = await axios.get(
        'https://63fe5fddc5c800a7238001c7.mockapi.io/cart'
      );
      const favoritesRespone = await axios.get(
        'https://63f7f8c36b93730c1234a6a4.mockapi.io/favorites'
      );
      const itemsResponse = await axios.get(
        'https://63fe5fddc5c800a7238001c7.mockapi.io/items'
      );

      setItems(itemsResponse.data);
      setCartItems(cartRespone.data);
      setFavorites(favoritesRespone.data);
    }
    fetchData();
  }, []);

  const onAddtoCart = (obj) => {
    const finditem = cartItems.find(
      (item) => Number(item.parentId) === Number(obj.id)
    );
    if (finditem) {
      axios.delete(
        `https://63fe5fddc5c800a7238001c7.mockapi.io/cart/${finditem.id}`
      );

      setCartItems((prev) =>
        prev.filter((item) => Number(item.parentId) !== Number(obj.id))
      );
    } else {
      axios
        .post('https://63fe5fddc5c800a7238001c7.mockapi.io/cart', obj)
        .then((res) => {
          setCartItems((prev) => [...prev, res.data]);
        });
    }
  };
  const onRemovedItem = (id) => {
    console.log(id);
    axios.delete(`https://63fe5fddc5c800a7238001c7.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(
        `https://63f7f8c36b93730c1234a6a4.mockapi.io/favorites/${obj.id}`
      );
      setFavorites((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios
        .post('https://63f7f8c36b93730c1234a6a4.mockapi.io/favorites', obj)
        .then((res) => {
          setFavorites((prev) => [...prev, res.data]);
        });
    }
  };

  const onChangeSearchinput = (event) => {
    setSearchValue(event.target.value);
  };
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };
  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        setCardOpened,
        setCartItems,
        onAddtoCart,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onCloseCart={() => setCardOpened(false)}
            onRemovedItem={onRemovedItem}
          />
        )}

        <Header onClickCart={() => setCardOpened(true)} />
        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchinput={onChangeSearchinput}
            onAddToFavorite={onAddToFavorite}
            onAddtoCart={onAddtoCart}
          ></Home>
        </Route>
        <Route path="/favorites" exact>
          <Favorites onAddToFavorite={onAddToFavorite}></Favorites>
        </Route>
        <Route path="/orders" exact>
          <Orders></Orders>
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
