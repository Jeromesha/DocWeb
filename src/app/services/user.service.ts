import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import * as CryptoJS from 'crypto-js';
import * as forge from "node-forge";

@Injectable()
export class UserService {

    publicKey: string = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAruzidSHRz8Pk6wy/aw3z
    U1lp+pB6BGU1LxsWGJMsJ2dRCks5+G3MBGttwOHwIMd42+PTy4tIwxBg3yI7yf2C
    mOKz+7UaG/pVQII4HfRmMxN7K5W9lf6+GSnmCdxDBtWc/4/AtRNrwHkDHwwK6bPn
    mysKZ9ymfxAT3MxKE9HpOUPaZzqqGEw7LbGW9nIWpAiBcbRTgvGRDsOuq4XVVDka
    v8H06TRgFrUtJ1HffIdW4XDJ/hUbAtzD3sLwomH4o0cLv/gnntf6HZNs51axB5Ep
    qIWXPSyHHd6Wi6Suij9/PDmrhTfOQSrrLrGxtOvchGO5H6IxGJJEhPYbozlGvJ90
    iQIDAQAB
    -----END PUBLIC KEY-----`;

    getEventRoute = '/api/user/';
    getVillageUserEventRoute = '/api/user';
    tokenFromUI: string = "1e2f3g4c5h7a8x9q";
    tokenFromIV: any;

    constructor(private dataService: DataService) {
    };

    getLookUp(refresh: boolean) {
        return this.dataService.getData('/api/user/lookup', refresh);
    }

    getAppVersion(apptype: any, refresh: boolean) {
        return this.dataService.getData('/api/common/version/' + apptype, refresh);
    }

    logout(data: any) {
        return this.dataService.post('/api/employee/logout', data).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }


    get(refresh: boolean) {
        return this.dataService.getData('/api/user', refresh);
    }

    getById(id: number, refresh: boolean) {
        return this.dataService.getData('/api/user/' + id, refresh);
    }

    save(result: any) {
        this.tokenFromIV = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
        if (result.password) {
            let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
            let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromIV);
            let encrypted = CryptoJS.AES.encrypt(
                JSON.stringify(result.password), _key, {
                keySize: 16,
                iv: _iv,
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            var encryptKeyIv = this.tokenFromIV + encrypted.toString();
        }
        // result.password = btoa(result.password);
        result.password = btoa(encryptKeyIv);
        return this.dataService.post('/api/user', result).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }

    delete(id: number, status: number) {
        return this.dataService.post('/api/user/update/' + id + '/' + status, null).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }

    forgotpasswordUser(user: any) {
        return this.dataService.post('/api/employee/forgotpassword', user).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }

    changepasswordUser(user: any) {
        // this.tokenFromIV = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
        // if (user.newPassword) {
        //     let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        //     let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromIV);
        //     let encrypted = CryptoJS.AES.encrypt(
        //         JSON.stringify(user.newPassword), _key, {
        //         keySize: 16,
        //         iv: _iv,
        //         mode: CryptoJS.mode.ECB,
        //         padding: CryptoJS.pad.Pkcs7
        //     });
        //     var newEncryptKeyIv = this.tokenFromIV + encrypted.toString();
        // }
        // if (user.oldPassword) {
        //     let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        //     let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromIV);
        //     let encrypted = CryptoJS.AES.encrypt(
        //         JSON.stringify(user.oldPassword), _key, {
        //         keySize: 16,
        //         iv: _iv,
        //         mode: CryptoJS.mode.ECB,
        //         padding: CryptoJS.pad.Pkcs7
        //     });
        //     var oldEncryptKeyIv = this.tokenFromIV + encrypted.toString();
        // }
        //  const request = {
        //     newPassword: btoa(newEncryptKeyIv),
        //     oldPassword: btoa(oldEncryptKeyIv),
        //     userId: user.userId
        // };

       
        var rsa = forge.pki.publicKeyFromPem(this.publicKey);
        var encryptedNewPassword = window.btoa(rsa.encrypt(user.newPassword));
        var encryptedoldPassword = window.btoa(rsa.encrypt(user.oldPassword));
        const request = {
            newPassword:encryptedNewPassword,
            oldPassword:encryptedoldPassword,
            userId: user.userId
        };
        debugger
        return this.dataService.post('/api/employee/changepassword', request).map(response => {
            debugger
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }

    newpaswordUser(user: any) {
        return this.dataService.post('/api/user/newpasword', user).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }

    getRoll(refresh: boolean) {
        return this.dataService.getData('/api/user/role', refresh);
    }

    getUserImg(userid: any, refresh: any) {
        return this.dataService.getData('/api/user/' + userid, refresh);
    }

    getMenu(refresh: boolean) {
        return this.dataService.getData('/api/user/menus', refresh);
    }

    getchildDetails(data: any, refresh: Boolean) {
        return this.dataService.getData('/api/child/details/' + data.districtId + '/' + data.blockId + '/' + data.sectorId + '/' + data.awcId, refresh);
    }

    getchildDetailsType(data: any, refresh: Boolean) {
        return this.dataService.getData('/api/child/details/' + data.districtId + '/' + data.blockId + '/' + data.sectorId + '/' + data.awcId + '/' + data.severityType, refresh);
    }

    getchildAliveDetailsType(data: any, refresh: Boolean) {
        return this.dataService.getData('/api/child/alivedetail/' + data.districtId + '/' + data.blockId + '/' + data.sectorId + '/' + data.awcId + '/' + data.severityType, refresh);
    }

    getmiDetailsType(data: any, refresh: Boolean) {
        return this.dataService.getData('/api/child/mi/' + data.districtId + '/' + data.blockId + '/' + data.sectorId + '/' + data.awcId + '/' + data.severityType, refresh);
    }

    getmiEvaluation(data: any, refresh: Boolean) {
        return this.dataService.getData('/api/report/mireview/' + data.districtId + '/' + data.blockId + '/' + data.sectorId + '/' + data.awcId, refresh);
    }

    getScreeningStatus(data: any, refresh: Boolean) {
        return this.dataService.getData('/api/report/screeningstatus/' + data.districtId + '/' + data.blockId, refresh);
    }

    getMichildStatus(data: any, refresh: Boolean) {
        return this.dataService.getData('/api/report/michildstatus/' + data.districtId + '/' + data.blockId + '/' + data.isZeroToSixMonth, refresh);
    }

    getMeSummary(data: any, refresh: Boolean) {
        return this.dataService.getData('/api/report/mesummary/' + data.districtId + '/' + data.blockId, refresh);
    }

    // getTimeline(id: any, refresh: boolean) {
    //     return this.dataService.getData('/api/beneficiary/' + id, refresh)
    // }

    getTimeline(id: any, type: any, refresh: boolean) {
        return this.dataService.getData('/api/beneficiary/' + id + '/' + type, refresh)
    }

}
