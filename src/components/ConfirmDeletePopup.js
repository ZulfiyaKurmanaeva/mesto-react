import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup(props) {

    function handleSubmit(e) {
        e.preventDefault()
        props.onConfirm();
    }

    return (
        <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
        </PopupWithForm>
    )
}

export default ConfirmDeletePopup;