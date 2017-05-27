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
    }

    connect(name,pwd) {
        this.client = SQLite.openDatabase({
            name: name,
            location: 'default',
        },() => Promise.resolve(db), (err) => Promise.reject(err));

        return new Promise((resolve,reject)=> {
            this.client.executeSql('SELECT * FROM info',[], (records)=>{
                if(records.rows.length == 0) {
                    reject();
                } else {
                    Guardin.setPassword(pwd);
                    resolve();
                }},
                (err)=>reject(err));
        });



        // return new Promise(function (resolve, reject) {
        //     let db = SQLite.openDatabase({
        //         name: name,
        //         location: 'default',
        //     },() => resolve(db), (err) => reject(err));
        // });
    }

    create(pwd) {
        let salt, encrypted_salt;
        let infoDB = this.client;

        salt = randomWord(false,64,128);
        Guardin.setPassword(pwd);
        encrypted_salt = Guardin.encrypt(salt);

        infoDB.executeSql('DROP TABLE IF EXISTS info;');
        infoDB.executeSql('DROP TABLE IF EXISTS passwords;');
        infoDB.executeSql('CREATE TABLE IF NOT EXISTS info( '
            + 'salt VARCHAR(128), '
            + 'encrypted_salt TEXT, '
            + 'created_at VARCHAR(128) ); ',
            (s)=>console.log('create success',s), (e)=>console.log('create fail',e));

        infoDB.executeSql('CREATE TABLE IF NOT EXISTS passwords( '
            + 'id INTEGER AUTOINCREMENT,'
            + 'name VARCHAR(255),'
            + 'user_name VARCHAR(255),'
            + 'salt VARCHAR(128), '
            + 'encrypted_pwd TEXT, '
            + 'created_at VARCHAR(128) ); ',
            (s)=>console.log('create success',s), (e)=>console.log('create fail',e));

        let created_at = new Date().toString();
        let sql = `INSERT INTO info (salt, encrypted_salt, created_at) VALUES (${salt},${encrypted_salt},${created_at})`;
        return new Promise((resolve, reject)=> {
            this.client.executeSql(sql, [],
                (success) => resolve(success),
                (err) => reject(err));
        });
    }

    queryInfo() {
        return new Promise((resolve, reject)=> {
            this.client.executeSql('SELECT * FROM info',[], (records)=>{
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
                processed = [];

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