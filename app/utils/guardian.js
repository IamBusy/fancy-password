/**
 * Created by william on 10/05/2017.
 */
let aesjs = require('aes-js');
import { sha256 } from 'react-native-sha256';

let counter = 3;

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

    encrypt(content) {
        return this.getKey().then( key => {
            let key_256 = key;
            let text = content;
            let textBytes = aesjs.utils.utf8.toBytes(text);
            let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counter));
            let encryptedBytes = aesCtr.encrypt(textBytes);
            let finalRes = aesjs.utils.hex.fromBytes(encryptedBytes);
            //console.log('final result:',finalRes);
            return finalRes;
        });
    }

    decrypt(content) {
        let encryptedBytes = aesjs.utils.hex.toBytes(content);
        let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counter));
        let decryptedBytes = aesCtr.decrypt(encryptedBytes);
        return aesjs.utils.utf8.fromBytes(decryptedBytes);
    }
}
export default new Guardin()
