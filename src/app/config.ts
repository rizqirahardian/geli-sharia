import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class Config {

    // URL
    URL: string = 'https://7a61202b61d6.ngrok.io'
    // URL: string = 'http://35.188.119.199:8082'
    // URL: string = 'http://35.188.119.199:8080'
    // URL: string = 'http://35.189.175.231:8082'
    // URL: string = 'https://bfiku-api.ekreasi.com'

    encryptKey: string = '6Eh2LM7g6yUeTGgD';

    encryptData(dataEncrypt) {
        var salt = CryptoJS.lib.WordArray.random(128 / 8);

        var key = CryptoJS.PBKDF2(this.encryptKey, salt, {
            keySize: 256 / 32,
            iterations: 100
        });

        var iv = CryptoJS.lib.WordArray.random(128 / 8);

        var encrypted = CryptoJS.AES.encrypt(dataEncrypt, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC

        });
        var transitmessage = salt.toString() + iv.toString() + encrypted.toString();
        return transitmessage;
    }

    decryptData(encryptData) {
        if (encryptData == null || encryptData === undefined) {

        } else {
            var salt = CryptoJS.enc.Hex.parse(encryptData.substr(0, 32));
            var iv = CryptoJS.enc.Hex.parse(encryptData.substr(32, 32))
            var encrypted = encryptData.substring(64);

            var key = CryptoJS.PBKDF2(this.encryptKey, salt, {
                keySize: 256 / 32,
                iterations: 100
            });

            var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
                iv: iv,
                padding: CryptoJS.pad.Pkcs7,
                mode: CryptoJS.mode.CBC
            })
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
    }
}