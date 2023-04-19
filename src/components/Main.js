import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext } from 'react';


function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <div className="profile__image-container">
                        <button className="profile__avatar-button" aria-label="change-avatar" onClick={() => { props.onEditAvatar(true) }}>
                            <img src={currentUser.avatar} alt='Avatar' className="profile__image" />
                        </button>
                    </div>

                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" aria-label="edit profile" onClick={() => { props.onEditProfile(true) }} />
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={() => { props.onAddPlace(true) }} />
            </section>

            <section className="elements">
                {props.cards.map((card) =>
                    <Card
                        card={card}
                        key={card._id}
                        id={card._id}
                        owner={card.owner}
                        name={card.name}
                        link={card.link}
                        likes={[...card.likes]}
                        onCardDelete={props.onCardDelete}
                        onCardLike={props.onCardLike}
                        onCardClick={props.onCardClick}
                    />
                )}
            </section>
        </main>
    )
}

export default Main