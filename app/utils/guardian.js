/**
 * Created by william on 10/05/2017.
 */
import AES from 'aes-js';
let pbkdf2 = require('pbkdf2');
let aesjs = require('aes-js');

let counter = 3;

class Guardin {
    constructor() {
        this.password = null;
        this.salt = null;
    }
    setPassword(pwd) {
        this.password = pwd;
    }

    setSalt(salt) {
        this.salt = salt;
    }

    getKey() {
        return pbkdf2.pbkdf2Sync(this.password, this.salt, 1, 256 / 8, 'sha512');
    }

    encrypt(content) {
        let key_256 = this.getKey();
        let text = content;
        let textBytes = aesjs.utils.utf8.toBytes(text);
        let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counter));
        let encryptedBytes = aesCtr.encrypt(textBytes);
        return aesjs.utils.hex.fromBytes(encryptedBytes);
    }

    decrypt(content) {
        let encryptedBytes = aesjs.utils.hex.toBytes(content);
        let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counter));
        let decryptedBytes = aesCtr.decrypt(encryptedBytes);
        return aesjs.utils.utf8.fromBytes(decryptedBytes);
    }
}
export default new Guardin()
