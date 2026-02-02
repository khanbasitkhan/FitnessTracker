import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'FitnessApp.db', location: 'default' },
  () => {},
  error => { console.log("DB Error: ", error); }
);

export const initDatabase = () => {
  db.transaction((tx) => {
    
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, age INTEGER, weight REAL, height REAL, goal TEXT, isLoggedIn INTEGER DEFAULT 0)',
        []
);
    
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, duration INTEGER, calories REAL, date TEXT)',
        []
        );
  });
};


export const checkUserSession = (callback) => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM users WHERE isLoggedIn = 1', [], (tx, results) => {
      if (results.rows.length > 0) {
        callback(true); 
      } else {
        callback(false); 
      }
    });
  });
};

export default db;