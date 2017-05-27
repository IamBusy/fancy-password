/**
 * Created by william on 10/05/2017.
 */

import SQLite from 'react-native-sqlite-storage';

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

    connect(name) {
        this.client = SQLite.openDatabase({
            name: name,
            location: 'default',
        },() => Promise.resolve(db), (err) => Promise.reject(err));

        // return new Promise(function (resolve, reject) {
        //     let db = SQLite.openDatabase({
        //         name: name,
        //         location: 'default',
        //     },() => resolve(db), (err) => reject(err));
        // });
    }

    create() {
        let infoDB = this.client;

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
    }

    queryInfo() {
        return new Promise((resolve, reject)=> {
            this.client.executeSql('SELECT * FROM info',[],
                (success)=>resolve(success),
                (err)=>reject(err));
        });
    }

    queryPasswords() {
        return new Promise((resolve, reject)=> {
            this.client.executeSql('SELECT * FROM passwords',[],
                (success)=>resolve(success),
                (err)=>reject(err));
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
        return new Promise((resolve, reject)=> {
            this.client.executeSql('SELECT * FROM passwords',[],
                (success)=>resolve(success),
                (err)=>reject(err));
        });
    }
}

let db = new DB();

export default db;