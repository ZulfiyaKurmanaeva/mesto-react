class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    _request(url, options) {
        return fetch(url, options).then(this._getResponse)
    }

    getInitialCards() {
        return this._request(`${this._url}/cards`, {
            headers: this._headers
        })
    }

    setCard(data) {
        return this._request(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    deleteCard(id) {
        return this._request(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }


    changeLikeCardStatus(id, isLiked) {
        return this._request(`${this._url}/cards/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
    }

    handleLikesCounting(request, id) {
        return this._request(`${this._url}/cards/${id}/likes`, {
            method: request,
            headers: this._headers,
        })
    }

    getUserInfo() {
        return this._request(`${this._url}/users/me`, {
            headers: this._headers
        })
    }

    setUserInfo(data) {
        return this._request(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    setUserAvatar(data) {
        return this._request(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }

}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-61',
    headers: {
        authorization: '367c1fcc-88ca-4868-a883-495290cf987f',
        'Content-Type': 'application/json'
    }
});

export default api;