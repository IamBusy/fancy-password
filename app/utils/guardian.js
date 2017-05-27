/**
 * Created by william on 10/05/2017.
 */
import AES from 'aes-js';
//let pbkdf2 = require('pbkdf2');
let aesjs = require('aes-js');
//let EasyPbkdf2 = require("easy-pbkdf2");
import { sha256 } from 'react-native-sha256';

let counter = 3;

class Guardin {
    constructor() {
        this.password = null;
        this.salt = null;
        // this.easyPbkdf2 = EasyPbkdf2();
        // this.easyPbkdf2.secureHash('password','salt',(err, pwdHash, originSalt) => {
        //     console.log(pwdHash);
        //     console.log(originSalt);
        //     console.log(err);
        // });
    }
    setPassword(pwd) {
        this.password = pwd;
    }

    setSalt(salt) {
        this.salt = salt;
    }

    getKey() {
        sha256(this.password).then( hash => aesjs.utils.hex.toBytes(hash));
        //return '';
        //return pbkdf2.pbkdf2Sync(this.password, this.salt, 1, 256 / 8, 'sha512');
    }

    encrypt(content) {
        this.getKey().then( key => {
            let key_256 = key;
            let text = content;
            let textBytes = aesjs.utils.utf8.toBytes(text);
            let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counter));
            let encryptedBytes = aesCtr.encrypt(textBytes);
            return aesjs.utils.hex.fromBytes(encryptedBytes);
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
