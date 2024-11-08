import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';


const database = () => {
    useEffect(() => {
        const dbFilePath = `${RNFS.DocumentDirectoryPath}/users.db`;

        // Check if the database file already exists
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
                createTablesAndInsertData(db);
            },
            error => {
                console.error('Error opening database', error);
            }
        );
    };

    const createTablesAndInsertData = (db) => {
        db.transaction(tx => {
            // Create Categories table
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          type TEXT NOT NULL CHECK (type IN ('Expense', 'Income'))
        );`,
                [],
                () => {
                    console.log('Categories table created successfully');
                },
                error => {
                    console.error('Error creating Categories table', error);
                }
            );

            // Create Transactions table
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_id INTEGER,
          amount REAL NOT NULL,
          date INTEGER NOT NULL,
          description TEXT,
          type TEXT NOT NULL CHECK (type IN ('Expense', 'Income')),
          FOREIGN KEY (category_id) REFERENCES Categories (id)
        );`,
                [],
                () => {
                    console.log('Transactions table created successfully');
                },
                error => {
                    console.error('Error creating Transactions table', error);
                }
            );

            // Insert data into Categories table
            const categories = [
                ['Utilities', 'Expense'],
                ['Electronics', 'Expense'],
                ['Dining Out', 'Expense'],
                ['Breakfast Supplies', 'Expense'],
                ['Household Items', 'Expense'],
                ['Christmas Gifts', 'Expense'],
                ['New Year Party Supplies', 'Expense'],
                ['Thanksgiving Groceries', 'Expense'],
                ['Bonus', 'Income'],
                ['Consulting Work', 'Income'],
                ['Part-time Job', 'Income'],
                ['Online Sales', 'Income'],
                ['Freelance Writing', 'Income'],
                ['End of Year Bonus', 'Income'],
                ['Thanksgiving Freelance', 'Income']
            ];

            categories.forEach(category => {
                tx.executeSql(
                    'INSERT INTO Categories (name, type) VALUES (?, ?);',
                    category,
                    () => {
                        console.log('Category inserted successfully');
                    },
                    error => {
                        console.error('Error inserting category', error);
                    }
                );
            });

            // Insert data into Transactions table
            const transactions = [
                [1, 100.50, 1709814000, 'Weekly groceries', 'Expense'],
                [1, 75.25, 1709900400, 'More groceries', 'Expense'],
                [2, 1200, 1707740400, 'Monthly rent', 'Expense'],
                [1, 45.99, 1710082800, 'Snacks and drinks', 'Expense'],
                [1, 60.00, 1707154800, 'Breakfast supplies', 'Expense'],
                [1, 110.75, 1707241200, 'Household items', 'Expense'],
                [2, 50.25, 1707327600, 'Utilities bill', 'Expense'],
                [1, 200.50, 1707414000, 'Electronics', 'Expense'],
                [1, 15.99, 1707500400, 'Dining out', 'Expense'],
                [1, 90.00, 1704562800, 'Christmas Gifts', 'Expense'],
                [1, 120.75, 1704649200, 'New Year Party Supplies', 'Expense'],
                [1, 85.50, 1701970800, 'Thanksgiving Groceries', 'Expense'],
                [2, 900, 1702057200, 'Rent November', 'Expense'],
                [3, 3000, 1709914800, 'Monthly salary', 'Income'],
                [4, 500, 1710001200, 'Freelance project', 'Income'],
                [3, 3200, 1707266800, 'Bonus', 'Income'],
                [4, 450, 1707353200, 'Consulting work', 'Income'],
                [3, 2800, 1707439600, 'Part-time job', 'Income'],
                [4, 600, 1707526000, 'Online sales', 'Income'],
                [3, 1500, 1707612400, 'Freelance writing', 'Income'],
                [3, 3100, 1704675600, 'End of Year Bonus', 'Income'],
                [4, 700, 1702083600, 'Thanksgiving Freelance', 'Income']
            ];

            transactions.forEach(transaction => {
                tx.executeSql(
                    'INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (?, ?, ?, ?, ?);',
                    transaction,
                    () => {
                        console.log('Transaction inserted successfully');
                    },
                    error => {
                        console.error('Error inserting transaction', error);
                    }
                );
            });

            // Confirm data was inserted
            tx.executeSql(
                'SELECT * FROM Categories;',
                [],
                (tx, results) => {
                    console.log('Categories:', results.rows.raw());
                },
                error => {
                    console.error('Error fetching categories', error);
                }
            );

            tx.executeSql(
                'SELECT * FROM Transactions;',
                [],
                (tx, results) => {
                    console.log('Transactions:', results.rows.raw());
                },
                error => {
                    console.error('Error fetching transactions', error);
                }
            );
        });
    };

    return (
        <View>
            <Text>App</Text>
        </View>
    );
};

export default database;

const styles = StyleSheet.create({});