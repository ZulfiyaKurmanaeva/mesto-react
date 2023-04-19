import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(card) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__like-button ${isLiked && 'elements__like-button_active'}`);

  function handleCardClick() {
    card.onCardClick(card);
  }

  function handleLikeClick() {
    card.onCardLike(card);
  }

  function handleDeleteClick() {
    card.onCardDelete(card);
  }

  return (
    <div className="elements__item">
      {isOwn && <button className="elements__delete-button" type="button" onClick={handleDeleteClick} />}
      <img className="elements__image" alt={card.name} src={card.link} onClick={handleCardClick} />
      <div className="elements__caption">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-group">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <div className="elements__like-count">{card.likes.length}</div>
        </div>
      </div>
    </div>
  )
}

export default Card