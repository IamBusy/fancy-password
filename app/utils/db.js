/**
 * Created by william on 10/05/2017.
 */

import SQLite from 'react-native-sqlite-storage';

export default function sqliteFactory(name) {
    return new Promise(function (resolve, reject) {
        let db = SQLite.openDatabase({
            name: name,
            location: 'default',
        },() => resolve(db), (err) => reject(err));
    });
}