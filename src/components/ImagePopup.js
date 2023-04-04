import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup img ${card.link && 'popup_opened'}`}>
            <figure className="popup__picture-container">
                <button className="popup__close popup__close-button" type="button" onClick={onClose} />
                <img className="popup__big-picture" src={card.link} alt={card.name} />
                <figcaption>
                    <h2 className="popup__picture-caption">{card.name}</h2>
                </figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;