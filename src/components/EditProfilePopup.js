import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);

    const [about, setAbout] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: about,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText={props.onLoading ? `Сохранение` : `Сохранить`}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input
                    name="name"
                    className="popup__input popup__input_type_name"
                    id="profileName-input"
                    type="text"
                    placeholder="Ваше имя"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name || ""}
                    onChange={handleChangeName}
                />
                <span className="profile-name-error popup__error" />
            </label>
            <label className="popup__label">
                <input
                    id="profileAbout-input"
                    name="about"
                    className="popup__input"
                    type="text"
                    placeholder="Пожалуйста, напишите о себе"
                    required
                    minLength="2"
                    maxLength="200"
                    value={about || ""}
                    onChange={handleChangeAbout}
                />
                <span className="profile-about-error popup__error" />
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;