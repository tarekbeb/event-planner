import { decorate, observable, action } from 'mobx';

class AppStore {
  userId = sessionStorage.getItem("userId") || null;
  token = sessionStorage.getItem("token") || null;
  tokenExpiration = sessionStorage.getItem("tokenExpiration") || null;

  login = (userId, token, tokenExpiration) => {
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('tokenExpiration', tokenExpiration);
  }

  logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('tokenExpiration');
  }
}
decorate(AppStore, {
  userId: observable,
  token: observable,
  tokenExpiration: observable,
  login: action,
  logout: action
})

export default new AppStore();