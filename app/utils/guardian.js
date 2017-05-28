/**
 * Created by william on 10/05/2017.
 */
let aesjs = require('aes-js');
import { sha256 } from 'react-native-sha256';

let counter = 5;

class Guardin {
    constructor() {
        this.password = null;
        this.salt = null;
        this.getKey = this.getKey.bind(this);
        this.encrypt = this.encrypt.bind(this);
        this.decrypt = this.decrypt.bind(this);
    }
    setPassword(pwd) {
        this.password = pwd;
    }

    setSalt(salt) {
        this.salt = salt;
    }

    getKey() {
        return sha256(this.password).then( hash => aesjs.utils.hex.toBytes(hash));
    }

    encrypt(text) {
        return this.getKey().then( key => {
            //console.log('Key=',key);
            //key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
            let textBytes = aesjs.utils.utf8.toBytes(text);
            let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counter));
            let encryptedBytes = aesCtr.encrypt(textBytes);
            return aesjs.utils.hex.fromBytes(encryptedBytes);
        });
    }

    decrypt(encryptedHex) {
        return this.getKey()
            .then(key => {
                //key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
                //console.log('Key=',key);
                let encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
                let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counter));
                let decryptedBytes = aesCtr.decrypt(encryptedBytes);
                return aesjs.utils.utf8.fromBytes(decryptedBytes);
            });

    }
}
export default new Guardin()
