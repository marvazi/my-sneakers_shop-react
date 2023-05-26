import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites({ onAddToFavorite }) {
  const { favorites } = React.useContext(AppContext);
  // Верстка компонента Header
  return (
    <div className="content p-40">
      <div className="d-flex mb-40 justify-between align-center">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item) => (
          <Card {...item} favorited={true} onFavorite={onAddToFavorite} />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
