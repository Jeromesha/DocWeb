import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserSessionService } from "./usersession.service";
import { DataService } from "./data.service";
import { UserSession } from "../models/usersession";

import * as jwtDecode from "jwt-decode";
import * as momenttz from "moment-timezone";

import "rxjs/add/operator/map";
import * as CryptoJS from "crypto-js";
import * as forge from "node-forge";

declare var require: any;
const timezone = require("src/assets/json/timezones.json");

@Injectable()
export class AuthenticationService {
  // publicKey: string = `-----BEGIN PUBLIC KEY-----
  //   MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAskgPKBcNpz71mi4NSYa5
  //   mazJrO0WZim7T2yy7qPxk2NqQE7OmWWakLJcaeUYnI0kO3yC57vck66RPCjKxWuW
  //   SGZ7dHXe0bWb5IXjcT4mNdnUIalR+lV8czsoH/wDUvkQdG1SJ+IxzW64WvoaCRZ+
  //   /4wBF2cSUh9oLwGEXiodUJ9oJXFZVPKGCEjPcBI0vC2ADBRmVQ1sKsZg8zbHN+gu
  //   U9rPLFzN4YNrCnEsSezVw/W1FKVS8J/Xx4HSSg7AyVwniz8eHi0e3a8VzFg+H09I
  //   5wK+w39sjDYfAdnJUkr6PjtSbN4/Sg/NMkKB2Ngn8oj7LCfe/7RNqIdiS+dQuSFg
  //   eQIDAQAB
  //   -----END PUBLIC KEY-----`;

  publicKey: string = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAruzidSHRz8Pk6wy/aw3z
  U1lp+pB6BGU1LxsWGJMsJ2dRCks5+G3MBGttwOHwIMd42+PTy4tIwxBg3yI7yf2C
  mOKz+7UaG/pVQII4HfRmMxN7K5W9lf6+GSnmCdxDBtWc/4/AtRNrwHkDHwwK6bPn
  mysKZ9ymfxAT3MxKE9HpOUPaZzqqGEw7LbGW9nIWpAiBcbRTgvGRDsOuq4XVVDka
  v8H06TRgFrUtJ1HffIdW4XDJ/hUbAtzD3sLwomH4o0cLv/gnntf6HZNs51axB5Ep
  qIWXPSyHHd6Wi6Suij9/PDmrhTfOQSrrLrGxtOvchGO5H6IxGJJEhPYbozlGvJ90
  iQIDAQAB
  -----END PUBLIC KEY-----`;
  private baseUrl = environment.apiBaseUrl;
  timeZones: any[];
  pageAccess = true;
  sessionData = new UserSession();
  tokenFromUI: string = "1e2f3g4c5h7a8x9q";
  tokenFromIV: any;

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private sessionService: UserSessionService
  ) {
    this.getTimeZones();
  }

  login(username: string, password: string, isLogin: boolean) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    const timeZone = this.getBrowserTimeZone();
    // // this.tokenFromIV = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
    // if (password) {
    //   let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    //   let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromIV);
    //   let encrypted = CryptoJS.AES.encrypt(
    //     JSON.stringify(password), _key, {
    //     keySize: 16,
    //     // iv: _iv,
    //     mode: CryptoJS.mode.ECB,
    //     padding: CryptoJS.pad.Pkcs7
    //   });
    //   var encryptKeyIv = this.tokenFromIV + encrypted.toString();
    // }
    // // result.password = btoa(result.password);
    // password = btoa(encryptKeyIv);
    // console.log(password)
    // if (password === 'dW5kZWZpbmVkNFArRW9qU3JpSThINW9VOGEzUWZLQT09') {
    //   password = 'seJOOB7ho8MIuJYK44ZvePWPGI+QUBS7wMkw30QgstY='
    // }

    var rsa = forge.pki.publicKeyFromPem(this.publicKey);
    var encryptedPassword = window.btoa(rsa.encrypt(password));

    // const pwd = this.encryptDecryptService.encryptUsingAES256(password);
    // console.log("Enc-->" + password + "*****" + pwd);
    // console.log("Enc-->" + password + "#####" + btoa(pwd));

    // this.tokenFromIV = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
    // if(password){
    //   let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    //   let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromIV);
    //   let encrypted = CryptoJS.AES.encrypt(
    //     JSON.stringify(password), _key, {
    //     keySize: 16,
    //     iv: _iv,
    //     mode: CryptoJS.mode.ECB,
    //     padding: CryptoJS.pad.Pkcs7
    //   });
    //   var encryptKeyIv = this.tokenFromIV + encrypted.toString();
    // }
    // const pwd = btoa(encryptKeyIv);
    // const data = { username, password: password, };
    // const data = { username: username, password: password, isForceLogout: true };
    const data = {
      username,
      password: encryptedPassword,
      isForceLogout: isLogin,
    };
    return this.http
      .post<any>(this.baseUrl + "/api/token", data, { headers })
      
      .map((user) => {
        debugger
        if (user && user.access_token) {
          this.clearCachedMenu();
          const decodedToken = jwtDecode(user.access_token);
          this.sessionData.email = decodedToken["user.email"];
          this.sessionData.mobileNumber = decodedToken["user.mobilenumber"];
          this.sessionData.authToken = user.access_token;
          this.sessionData.userId = decodedToken["user.id"];
          this.sessionData.roleId = decodedToken["user.roleId"];
          // this.sessionData.roleName = decodedToken["user.rolename"];
          // this.sessionData.userFullName = decodedToken["user.fullname"];
          // this.sessionData.isDynamicPassword =
          //   decodedToken.referrence1 === "True";
          // this.sessionData.districtId = decodedToken["user.districtId"];
          // this.sessionData.filterblockId = decodedToken["user.blockId"];
          this.sessionData.languageType = parseInt(
            decodedToken["user.languagetype"]
          );
          this.sessionService.create(this.sessionData);
        }
        return user;
      });
  }

  isAuthenticated() {
    debugger
    return !!this.sessionService.userId() && !!this.sessionService.authToken();
  }

  isPageAccessAvailable(pageUrl, pageTitle) {
    debugger
    const rolePages = this.sessionService.getLocalStorageWithKey("role")
      ? this.sessionService.getLocalStorageWithKey("role")
      : "[]";
    const pages = JSON.parse(rolePages);
    const paths = ["/unauthorized", "/dashboard"];
    if (pages && pages.length > 0) {
      pages.forEach((field) => {
        if (field.path) {
          paths.push(field.path);
          paths.push(field.title);
        }
        if (field.submenu && field.submenu.length > 0) {
          field.submenu.forEach((field1) => {
            if (field1.path) {
              paths.push(field1.path);
              paths.push(field1.title);
              if (
                field1.path === "/beneficiaries/1" ||
                field1.path === "/beneficiaries/2"
              ) {
                paths.push("beneficiaries");
              }
            }
          });
        }
      });
      this.pageAccess =
        paths.indexOf(pageUrl) >= 0 || paths.indexOf(pageTitle) >= 0
          ? true
          : false;
    }
    return this.pageAccess;
  }

  hasRequiredPermission(permission) {
    for (let i = 0; i < permission.length; i++) {
      if (permission[i] === this.sessionService.roleId()) {
        return true;
      }
    }
    return false;
  }

  getTimeZones() {
    this.timeZones = timezone.timeZone;
  }

  getBrowserTimeZone(): string {
    const zoneName = momenttz.tz.guess();
    const temptimezone = momenttz.tz(zoneName).zoneAbbr();
    const filterZone = this.timeZones.find((i) => i.abbr === temptimezone);
    if (filterZone) {
      return filterZone.value;
    }
    return "";
  }

  clearCachedMenu() {
    this.dataService.clearCache();
  }

  clearSession() {
    this.sessionService.destroy();
    this.clearCachedMenu();
  }

  logOut() {
    this.clearCachedMenu();
    this.sessionService.destroy();
  }
}
