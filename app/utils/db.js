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
                            + 'user_name VARCHAR(255),'
                            + 'salt VARCHAR(128), '
                            + 'encrypted_pwd TEXT, '
                            + 'created_at VARCHAR(128) ); ');

                        let sql = `INSERT INTO info (salt, encrypted_salt, created_at) VALUES ('${salt}','${encrypted_salt}','${created_at}')`;

                        tx.executeSql(sql);

                    },err=>reject(err),succ=>resolve(succ));
                });
            });
    }

    queryInfo(pwd) {
        // Guardin.setPassword("123");
        // Guardin.encrypt("Text may be any length you wish, no padding is required.")
        //     .then( encrypted => {
        //         Guardin.setPassword("123");
        //         console.log('test encrypted:',encrypted);
        //         Guardin.decrypt(encrypted).then(content=>{
        //             console.log('test decrypted',content);
        //         })
        //     })
        //     // .then( content => {
        //     //     console.log('test decrypted',content);
        //     // });
        // return ;
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
        return new Promise((resolve, reject)=> {
            this.client.executeSql('SELECT * FROM passwords',[], (records)=>{
                Guardin.setPassword(pwd);
                let processed = [];
                let promises = [];
                for (let i=0;i<records.length;i++) {
                    let item = records.rows.item(i);
                    promises.push(
                        Guardin.decrypt(item.encrypted_pwd)
                            .then(pwd=>{
                                item.password = pwd;
                                delete item.encrypted_pwd;
                                processed.push(item);
                            }));

                }
                Promise.all(promises)
                    .then(resolve(processed));

                }, (err)=>reject(err));
        });
    }

    updatePassword(id, pwd) {
        return new Promise((resolve, reject)=> {
            this.client.executeSql('SELECT * FROM passwords',[],
                (success)=>resolve(success),
                (err)=>reject(err));
        });
    }

    insertPassword(pwd) {
        let salt = pwd.salt,
            name = pwd.name,
            user_name = pwd.user_name,
            encrypted_pwd = pwd.encrypted_password,
            created_at = new Date().toString();

        let sql = `UPDATE passwords SET name=${name},user_name=${user_name},encrypted_pwd=${encrypted_pwd},salt=${salt},created_at=${created_at};`;
        return new Promise((resolve, reject)=> {
            this.client.executeSql(sql,[],success =>resolve(success),error=>reject(error));
        });
    }
}

let db = new DB();

export default db;