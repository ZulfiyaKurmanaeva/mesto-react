import { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopupImageOpen, setIsPopupImageOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(userInfo => setCurrentUser(userInfo))
      .catch(err => console.log(err))

    api.getInitialCards()
      .then(cards => {
        setCards(cards.map((card) => ({
          name: card.name,
          link: card.link,
          _id: card._id,
          owner: card.owner,
          likes: card.likes,
        })
        ))
      })
      .catch(err => console.log(err))
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({});
    setCardToDelete(null);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isPopupImageOpen;

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      }
    }
  }, [isOpen]);

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.setUserAvatar(data)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api.setUserInfo(newUserInfo)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card.id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card.id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    setCardToDelete(card.id);
  }

  function handleConfirmDelete() {
    api.deleteCard(cardToDelete)
      .then(() => {
        setCards(cards.filter(item => item._id !== cardToDelete))
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);

    api.setCard(data)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPopupImageOpen(true);
  };



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={setIsEditProfilePopupOpen}
          onEditAvatar={setIsEditAvatarPopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isPopupImageOpen}
          onClose={closeAllPopups}
        />

        <ConfirmDeletePopup
          isOpen={!!cardToDelete}
          onClose={closeAllPopups}
          onConfirm={handleConfirmDelete}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
