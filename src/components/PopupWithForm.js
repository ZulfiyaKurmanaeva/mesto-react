import React from "react";

function PopupWithForm({ name, title, children, buttonText, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <form className="popup__form" name={name}>
          <button className="popup__close popup__close-button" type="submit" onClick={onClose} />
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__button" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
