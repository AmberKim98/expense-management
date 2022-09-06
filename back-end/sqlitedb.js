var sqlite3 = require('sqlite3').verbose();
const DBSource = "expenseDB.sqlite";

let db = new sqlite3.Database(DBSource, (err) => {
    if(err) {
        console.error(err.message);
        throw err;
    }
    else {
        console.log('Successfully connected to the SQLite database');
        db.run(`DELETE FROM expense`);
        
        db.run(`CREATE TABLE IF NOT EXISTS expense (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item text,
            category text,
            location text,
            amount text,
            spentOn text,
            createdOn text
        )`, 
            (err) => {
                if(err) {
                    console.log(err);
                } else {
                    var insert = 'INSERT INTO expense(item, category, location, amount, spentOn, createdOn) VALUES (?,?,?,?,?,?)';
                    
                    db.run(insert, ['item1', 'category1', 'location1', 10, '2022-05-23', '2022-05-23']);
                    db.run(insert, ['item2', 'category2', 'location2', 6, '2022-05-23', '2022-05-23']);
                    db.run(insert, ['item3', 'category3', 'location3', 20, '2022-05-23', '2022-05-23']);
                    db.run(insert, ['item4', 'category4', 'location4', 12, '2022-05-23', '2022-05-23']);
                    db.run(insert, ['item5', 'category5', 'location5', 7, '2022-05-23', '2022-05-23']);
                    console.log('Expense table was successfully created!'); 
                }
            }
        )
    }
});

module.exports = db;