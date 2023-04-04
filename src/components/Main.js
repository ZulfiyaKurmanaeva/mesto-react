import Card from './Card.js'
import api from '../utils/Api.js'
import React, { useEffect, useState } from 'react';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo().then((profileInfo) => {
            setUserName(profileInfo.name)
            setUserDescription(profileInfo.about)
            setAvatar(profileInfo.avatar)
        })
            .catch((err) => console.log(err))

        api.getInitialCards().then((cardsData) => {
            setCards(cardsData.map((data) => ({
                cardId: data._id,
                name: data.name,
                link: data.link,
                likes: data.likes
            })))
        })
            .catch((err) => console.log(err))
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <div className="profile__image-container">
                        <button className="profile__avatar-button" aria-label="change-avatar" onClick={() => { onEditAvatar(true) }}>
                            <img src={userAvatar} alt='Avatar' className="profile__image" />
                        </button>
                    </div>

                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit-button" type="button" aria-label="edit profile" onClick={() => { onEditProfile(true) }}></button>
                        <p className="profile__about">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={() => { onAddPlace(true) }}></button>
            </section>

            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card.cardId}
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        onCardClick={onCardClick}
                    />
                ))}
            </section>
        </main>

    )
}
export default Main
