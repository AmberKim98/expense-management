var express = require('express');
var cors = require('cors');
var db = require('./sqlitedb.js');

var app = express();
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var http_port = 8000;
app.listen(http_port, () => {
    console.log('Server running on port %port%'.replace('%port%', http_port));
});

app.get('/', (req, res, next) => {
    res.json({ 'message' : 'Connection OK!' })
});

app.get('/api/expense', (req, res, next) => {
    var sql = "SELECT * FROM expense";
    var params = [];
    db.all(sql, params, (err,rows) => {
        if(err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json(rows);
    })
})

app.get('/api/expense/:id', (req, res, next) => {
    var sql = "SELECT * FROM expense WHERE id = ?";
    var params = req.params.id;
    db.get(sql, params, (err, rows) => {
        if(err) {
            res.status(404).json({ 'error' : err.message });
            return;
        }
        res.json(rows);
    })
})

app.post('/api/expense/', (req, res, next) => {
    var errors = [];
    if(!req.body.item) {
        errors.push('No items specified!');
    }
    var data = {
        item: req.body.item,
        category: req.body.category,
        location: req.body.location,
        amount: req.body.amount,
        spentOn: req.body.spentOn
    };
    var sql = "INSERT INTO expense(item, category, location, amount, spentOn) VALUES (?,?,?,?,?)";
    var params = [data.item, data.category, data.location, data.amount, data.spentOn];
    db.run(sql, params, function(err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }    

        data.id = this.lastID;
        res.json(data);
    })
})

app.put('/api/expense/:id', (req, res, next) => {
    var errors = [];
    if(!req.body.item) {
        errors.push('No items specified to update the record!')
    }
    var data = {
        item: req.body.item,
        category: req.body.category,
        location: req.body.location,
        amount: req.body.amount,
        spentOn: req.body.spentOn
    };
    db.run(
        `UPDATE expense SET 
        item = ?, 
        category = ?, 
        location = ?, 
        amount = ?, 
        spentOn = ? WHERE id = ?`, 
        [data.item, data.category, data.location, data.amount, data.spentOn, req.params.id], function(err, result) {
        if(err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json(data);
    })
})

app.delete('/api/expense/:id', (req, res, next) => {
    var sql = "DELETE FROM expense WHERE id = ?";
    var params = req.params.id;
    db.run(sql, params, function(err, result) {
        if(err) {
            res.status(400).json({ "error" : res.message })
            return;
        }
        res.json({"message":"deleted", changes: this.changes});
    })
})

app.use(function(req, res) {
    res.status(404);
})