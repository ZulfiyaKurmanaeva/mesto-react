import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import React from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({});
  }

  return (
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={setIsEditProfilePopupOpen}
          onEditAvatar={setIsEditAvatarPopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onCardClick={setSelectedCard} />
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <input
            name="avatar"
            className="popup__input"
            type="url"
            id="avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="profile-avatar-error popup__error" />
        </PopupWithForm>
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <input
            name="name"
            className="popup__input"
            type="text"
            placeholder="Ваше имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="profile-name-error popup__error" />
          <input
            name="about"
            className="popup__input"
            type="text"
            placeholder="Расскажите о себе"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error about-error" />
        </PopupWithForm>
        <PopupWithForm
          name="place"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <input
            name="name"
            type="text"
            className="popup__input"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="elements-title-error popup__error" />
          <input
            name="link"
            type="url"
            className="popup__input"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error placeLink-error" />
        </PopupWithForm>
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да">
        </PopupWithForm>
      </div>
   );
}

export default App;