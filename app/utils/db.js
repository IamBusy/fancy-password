/**
 * Created by william on 10/05/2017.
 */

import SQLite from 'react-native-sqlite-storage';
import Guardin from '../utils/guardian';
import { randomWord } from './random';

// export default function sqliteFactory(name) {
//     return new Promise(function (resolve, reject) {
//         let db = SQLite.openDatabase({
//             name: name,
//             location: 'default',
//         },() => resolve(db), (err) => reject(err));
//     });
// }

class DB {
    constructor() {
        this.client = null;
        this.password = null;
        this.connect = this.connect.bind(this);
        this.queryInfo = this.queryInfo.bind(this);
        this.create = this.create.bind(this);
        this.queryPasswords = this.queryPasswords.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.insertPassword = this.insertPassword.bind(this);
        this.hasInited = this.hasInited.bind(this);
    }

    connect(name) {
        this.client = SQLite.openDatabase({
            name: name,
            location: 'default',
        },() => {}, (err) => console.log('open database:',err));
    }

    create(pwd) {
        this.password = pwd;
        let salt, encrypted_salt, created_at;
        let infoDB = this.client;

        salt = randomWord(false,64,128);
        created_at = new Date().toString();
        Guardin.setPassword(pwd);
        return Guardin.encrypt(salt)
            .then(encrypted_salt=>{
                //console.log(salt,encrypted_salt);
                return new Promise((resolve, reject)=>{
                    infoDB.transaction(function (tx) {
                        tx.executeSql('DROP TABLE IF EXISTS info;',[]);
                        tx.executeSql('DROP TABLE IF EXISTS passwords;');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS info( '
                            + 'salt VARCHAR(128), '
                            + 'encrypted_salt TEXT, '
                            + 'created_at VARCHAR(128) ); ');

                        tx.executeSql('CREATE TABLE IF NOT EXISTS passwords( '
                            + 'id INTEGER PRIMARY KEY  AUTOINCREMENT,'
                            + 'name VARCHAR(255),'
                            + 'username VARCHAR(255),'
                            + 'salt VARCHAR(128), '
                            + 'encrypted_pwd TEXT, '
                            + 'url VARCHAR(255),'
                            + 'note VARCHAR(255), '
                            + 'created_at VARCHAR(128) ); ');

                        let sql = `INSERT INTO info (salt, encrypted_salt, created_at) VALUES ('${salt}','${encrypted_salt}','${created_at}')`;

                        tx.executeSql(sql);

                    },err=>reject(err),succ=>resolve(succ));
                });
            });
    }

    queryInfo(pwd) {
        this.password = pwd;
        let that = this;
        return new Promise((resolve, reject)=> {
            that.client.executeSql('SELECT * FROM info',[], (records)=>{
                console.log(records);
                    if(records.rows.length == 0) {
                        reject();
                    } else {
                        let item = records.rows.item(0);
                        console.log(item);
                        Guardin.setPassword(pwd);
                        Guardin.decrypt(item.encrypted_salt)
                            .then(salt => {
                                console.log('decrypted salt=',salt);
                                if(item.salt != salt) {
                                    reject();
                                } else {
                                    console.log('success!!!!!!!!!');
                                    resolve();
                                }
                            });
                    }},
                (err)=>reject(err));
        });
    }

    hasInited() {
        let that = this;
        return new Promise((resolve, reject)=> {
            that.client.executeSql('SELECT * FROM info',[], (records)=>{
                    console.log(records);
                    if(records.rows.length == 0) {
                        reject();
                    } else {
                        resolve();
                    }},
                (err)=>reject(err));
        });
    }

    queryPasswords(pwd) {
        this.password = pwd;
        return new Promise((resolve, reject)=> {
            this.client.executeSql('SELECT * FROM passwords',[], (records)=>{
                console.log(records);
                Guardin.setPassword(pwd);
                //let processed = [];
                let promises = [];
                for (let i=0;i<records.rows.length;i++) {
                    let item = records.rows.item(i);
                    //console.log('item=',item);
                    promises.push(
                        Guardin.decrypt(item.encrypted_pwd)
                            .then(pwd=>{
                                item.password = pwd;
                                delete item.encrypted_pwd
                                //console.log(item);
                                return item;
                                //processed[i]=item;
                            }));

                }
                Promise.all(promises)
                    .then(res => resolve(res));

                }, (err)=>reject(err));
        });
    }

    updatePassword(info) {
        let id = info.id;
        let salt = randomWord(false,32,64),
            name = info.name,
            username = info.username,
            url = info.url,
            note = info.note,
            password = info.password,
            created_at = new Date().toString();
        return Guardin.encrypt(password)
            .then(encrypted_pwd => {
                let sql = `UPDATE passwords SET ` +
                    `name='${name}',`+
                    `username='${username}',`+
                    `encrypted_pwd='${encrypted_pwd}',`+
                    `url='${url}',`+
                    `note='${note}',`+
                    `salt='${salt}',`+
                    `created_at='${created_at}' WHERE id = '${id}';`;

                return new Promise((resolve, reject)=> {
                    this.client.executeSql(sql,[],
                        (success)=>resolve(success),
                        (err)=>reject(err));
                });
            });
    }

    insertPassword(info) {
        let salt = randomWord(false,32,64),
            name = info.name,
            username = info.username,
            url = info.url,
            note = info.note,
            password = info.password,
            created_at = new Date().toString();

        return Guardin.encrypt(password)
            .then(encrypted_pwd => {
                let sql = `INSERT INTO passwords (name,username,encrypted_pwd,url,note,salt,created_at)` +
                    ` VALUES ('${name}','${username}','${encrypted_pwd}','${url}','${note}','${salt}','${created_at}');`;

                return new Promise((resolve, reject)=> {
                    this.client.executeSql(sql,[],success =>resolve({
                        ...info,
                        id: success.insertId
                    }),error=>reject(error));
                });
            });
    }
}

let db = new DB();

export default db;