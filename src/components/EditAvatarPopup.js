import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    function handleChangeAvatar() {
        return avatarRef.current.value;
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText={props.onLoading ? `Сохранение` : `Сохранить`}>
            <label className="popup__label">
                <input
                    name="avatar"
                    className="popup__input popup__input_type_avatar"
                    type="url"
                    id="avatar"
                    placeholder="Ссылка на картинку"
                    onChange={handleChangeAvatar}
                    ref={avatarRef}
                    required
                />
                <span className="profile-avatar-error popup__error" />
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;