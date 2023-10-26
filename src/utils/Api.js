class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  updateCurrentUser(data, info) {
    return fetch(`${ this._url }/auth/users/me/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      },
      body: info.updateAvatar ? data : JSON.stringify({
        username: data.username,
        status: data.status
      })
    })
    .then((res) => this._getResponseData(res));
  }

  updateUserAvatar(formData) {
    return fetch(`${ this._url }/auth/users/me/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      },
      body: formData
    })
    .then((res) => this._getResponseData(res));
  }

  getRooms() {
    return fetch(`${ this._url }/chat/room/`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then((res) => this._getResponseData(res));
  }

  getChatMessages(roomId) {
    return fetch(`${ this._url }/chat/message/?room=${ roomId }`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then((res) => this._getResponseData(res));
  }

  createChatMessage(roomId, text) {
    return fetch(`${ this._url }/chat/message/`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      },
      body: JSON.stringify({
        room: roomId,
        text: text,
      })
    })
    .then((res) => this._getResponseData(res));
  }

  getRoomInfo(roomId) {
    return fetch(`${ this._url }/chat/room/${ roomId }/`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then((res) => this._getResponseData(res));
  }

  updateRoomTitle(roomId, title) {
    return fetch(`${ this._url }/chat/room/${ roomId }/`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      },
      body: JSON.stringify({
        title: title,
      })
    })
    .then((res) => this._getResponseData(res));
  }

  updateRoomPhoto(roomId, formData) {
    return fetch(`${ this._url }/chat/room/${ roomId }/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      },
      body: formData,
    })
    .then((res) => this._getResponseData(res));
  }

  addMembersToRoom(membersToAdd, roomId) {
    return fetch(`${ this._url }/chat/room/${ roomId }/`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      },
      body: JSON.stringify({
        member_to_add: membersToAdd,
        member_to_remove: []
      }),
    })
    .then((res) => this._getResponseData(res));
  }

  getUserInfo(id) {
    return fetch(`${ this._url }/auth/users/${ id }/`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then((res) => this._getResponseData(res));
  }

  createRoom(membersToAdd, roomTitle) {
    return fetch(`${ this._url }/chat/room/`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      },
      body: JSON.stringify({
        member_set: membersToAdd,
        title: roomTitle
      })
    })
    .then((res) => this._getResponseData(res));
  }

  getAllUsers() {
    return fetch(`${ this._url }/auth/users/`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then((res) => this._getResponseData(res));
  }

  getUserFriends(userId) {
    return fetch(`${ this._url }/auth/users/friend/${ userId }/`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then((res) => this._getResponseData(res));
  }

  getFriendRequests() {
    return fetch(`${ this._url }/auth/users/friend/request`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then((res) => this._getResponseData(res));
  }

  handleFriend(friendToAdd, friendToRemove) {
    return fetch(`${ this._url }/auth/users/friend/request/`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      },
      body: JSON.stringify({
        friend_to_add: friendToAdd,
        friend_to_remove: friendToRemove
      })
    })
    .then((res) => this._getResponseData(res));
  }

  deleteFriend(friendToRemove) {
    return fetch(`${ this._url }/auth/users/friend/`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      },
      body: JSON.stringify({
        friend_to_add: [],
        friend_to_remove: friendToRemove
      })
    })
    .then((res) => this._getResponseData(res));
  }

  getMoreMessages(next) {
    return fetch(next, {
      method: 'GET',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then((res) => this._getResponseData(res));
  }

  getMoreFriends(next) {
    return fetch(next, {
      method: 'GET',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  url: 'http://localhost/api/v1',
  headers: {
    'Accept': 'application/json',
    'Content-Type' : 'application/json'
  }
});

export default api;