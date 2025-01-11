/**
 * @description login context
 */

import { createContext } from 'react';
class Context {
  constructor(isLoggedIn = false , user = {}) {
    this._isLoggedIn = isLoggedIn;
    this._user = user;
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }
  set isLoggedIn(value) {
    this._isLoggedIn = value;
  }
  get user() {
    return this.user
  }
  set user(user) {
    this._user = user;
  }
  
  
}
const defaultContext = new Context();
export const loginContext = createContext(defaultContext);
