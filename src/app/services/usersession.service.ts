import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { UserSession } from '../models/usersession';

@Injectable()

export class UserSessionService {

  session = new UserSession();
  localStorageSessionKey: string;
  filterArr: any[];


  constructor() {
    this.localStorageSessionKey = 'eGramam-' + environment.apiBaseUrl + '-AuthData';
  }

  create(session) {// jshint ignore:line
    this.setLocalStorageProperties(session);
  }

  destroy() {// jshint ignore:line
    this.setLocalStorageProperties(new UserSession());
    localStorage.removeItem('role');
    localStorage.clear();
  }

  load() { // jshint ignore:line
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData;
  }

  authToken() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).authToken;
  }

  userId(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? 0 : +JSON.parse(jsonData).userId;
  }

  getUserName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).userFullName;
  }

  roleId(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? 0 : +JSON.parse(jsonData).roleId;
  }

  roleName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).roleName;
  }

  getClientId() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? [] : JSON.parse(jsonData).clientId;
  }

  getCurrentClientId() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? [] : JSON.parse(jsonData).currentClientId;
  }

  getCurrentClientName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? [] : JSON.parse(jsonData).currentClientName;
  }

  getEmail() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? [] : JSON.parse(jsonData).email;
  }

  getLanguageType() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? [] : JSON.parse(jsonData).languageType;
  }

  referrence2() {
    const jsonData = JSON.parse(localStorage.getItem(this.localStorageSessionKey));
    return JSON.parse(jsonData.departmentId).Services;
  }

  setLocalStorageProperties(session: any) {// jshint ignore:line
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(session));
  }

  getLocalStorageWithKey(key: any) {// jshint ignore:line
    return localStorage.getItem(key);
  }

  setLocalStorageWithKey(key: any, session: any) {// jshint ignore:line
    localStorage.setItem(key, JSON.stringify(session));
  }

  isDynamicPassword() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData);
  }

  getPageUrl(key: any) {
    this.filterArr = [];
    const menu = JSON.parse(this.getLocalStorageWithKey('menucontrols'))
    const filterItems = menu.map(e => {
      e.submenu.forEach(element => {
        this.filterArr.push(element);
      });
    });
    const output = this.filterArr.find(e => {
      return e.path === key;
    })
    // output.edit = true;
    // output.delete = true;
    // output.view = true;
    // output.approve = true;
    // output.copy = true;
    return output.controlAccess;
  }
}

