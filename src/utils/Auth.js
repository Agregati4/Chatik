class Auth {
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

  getCurrentUser() {
    return fetch(`${ this._url }/auth/users/me/`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then((res) => this._getResponseData(res));
  }

  signUp(data) {
    return fetch(`${ this._url }/auth/users/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        username: data.name,
        email: data.email,
        password: data.password
      })
    })
    .then((res) => this._getResponseData(res));
  }

  signIn(data) {
    return fetch(`${ this._url }/auth/jwt/create/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    .then((res) => this._getResponseData(res));
  }

  validation(token) {
    return fetch(`${ this._url }/auth/jwt/verify`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        token: token
      })
    })
    .then((res) => this._getResponseData(res));
  }

  tokenRefresh(refresh) {
    return fetch(`${ this._url }/auth/jwt/refresh`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        refresh: refresh
      })
    })
    .then((res) => this._getResponseData(res));
  }
}

const auth = new Auth({
  url: 'http://localhost/api/v1',
  headers: {
    'Accept': 'application/json',
    'Content-Type' : 'application/json'
  }
});

export default auth;