import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'} `}>
      <div className="popup__container">
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
          <button className="popup__close popup__close-button" type="button" onClick={props.onClose} />
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__button" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
