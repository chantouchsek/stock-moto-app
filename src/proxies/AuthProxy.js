import Proxy from './BaseProxy';

class AuthProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('oauth', parameters);
  }

  /**
   * Method used to login.
   *
   * @param {String} username The username.
   * @param {String} password The password.
   *
   * @returns {Promise} The result in a promise.
   */
  login({ username, password }) {
    const data = {
      username,
      password,
      client_id: process.env.API_CLIENT_ID,
      client_secret: process.env.API_CLIENT_SECRET,
      grant_type: 'password',
      scope: '',
    };

    return this.submit('post', `${this.endpoint}/token`, data);
  }
}

export default AuthProxy;
