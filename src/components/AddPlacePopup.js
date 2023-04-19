import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [placeName, setPlaceName] = useState('');
    const [placeLink, setPlaceLink] = useState('');

    useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: placeName,
            link: placeLink,
        });
    }

    function handleChangePlaceName(e) {
        setPlaceName(e.target.value);
    }

    function handleChangePlaceLink(e) {
        setPlaceLink(e.target.value);
    }

    return (
        <PopupWithForm
            name="place"
            title="Новое место"
            buttonText={props.onLoading ? `Сохранение` : `Создать`}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpen={props.isOpen}>
            <label className="popup__label">
                <input
                    required
                    type="text"
                    className="popup__input popup__input_type_elements-title"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    name="name"
                    value={placeName}
                    onChange={handleChangePlaceName}
                />
                <span className="elements-title-error popup__error" />
            </label>
            <label className="popup__label">
                <input
                    required
                    type="url"
                    className="popup__input popup__input_type_elements-link"
                    placeholder="Ссылка на картинку"
                    name="link"
                    value={placeLink}
                    onChange={handleChangePlaceLink}
                />
                <span className="elements-link-error popup__error" />
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;