import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

const App = () => {
  useEffect(() => {
    const dbFilePath = `${RNFS.DocumentDirectoryPath}/users.db`;


    RNFS.exists(dbFilePath)
      .then(exists => {
        if (!exists) {
          // Copy the database file from assets to the app's data directory
          RNFS.copyFileAssets('users.db', dbFilePath)
            .then(() => {
              console.log('Database file copied successfully');
              openDatabase();
            })
            .catch(error => {
              console.error('Error copying database file', error);
            });
        } else {
          openDatabase();
        }
      })
      .catch(error => {
        console.error('Error checking database file existence', error);
      });
  }, []);

  const openDatabase = () => {
    let db = SQLite.openDatabase(
      {
        name: 'users.db',
        location: 'default',
      },
      () => {
        console.log('Database opened successfully');
        // Create a new table
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)',
            [],
            () => {
              console.log('Table created successfully');
            },
            error => {
              console.error('Error creating table', error);
            }
          );
        });
      },
      error => {
        console.error('Error opening database', error);
      }
    );
  };

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});