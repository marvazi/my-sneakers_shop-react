import React from 'react';
import AppContext from '../context';
function Card({
  id,
  onFavorite,
  imageUrl,
  price,
  title,
  onPlus,
  favorited = false,
  added = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, imageUrl, price, title };

  const onClickPlus = () => {
    onPlus(obj);
  };
  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="card">
      <div className="favorite" onClick={onClickFavorite}>
        {onFavorite && (
          <img
            src={isFavorite ? '/img/superliked.svg' : '/img/heart.svg'}
            alt=""
          />
        )}
      </div>
      <img width={133} height={112} src={imageUrl} alt="" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>

        {onPlus && (
          <img
            className="cu-p"
            onClick={onClickPlus}
            src={isItemAdded(id) ? '/img/cheked.svg' : '/img/plus.svg'}
            alt=""
          />
        )}
      </div>
    </div>
  );
}
export default Card;
