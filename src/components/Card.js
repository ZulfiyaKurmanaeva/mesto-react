import React from 'react';

function Card(card) {
  function handleCardClick() {
    card.onCardClick(card);
  }
  return (
    <div className="elements__item">
      <button className="elements__delete-button" type="button"></button>
      <img className="elements__image" alt={card.name} src={card.link} onClick={handleCardClick} />
      <div className="elements__caption">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-group">
          <button className="elements__like-button" type="button"></button>
          <p className="elements__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card