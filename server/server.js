const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Food database
const db = require('./config/db');

app.get('/api/foodList', (req, res) => {
    // db에서 food 목록 가져오고 front로 전송
    
    // example
    // 0: {id: 1, name: 'food2', meat: 1, milk: 0, ... , make: 1.~}
    // 1: {id: 2, name: 'food3', meat: 0, milk: 1, ... , make: 1.~}
    // 2: {id: 3, name: 'food1', meat: 0, milk: 0, ... , make: 1/~}

    db.query("select * from food", (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
})

app.get('/api/userCart/:id', (req, res) => {
    const id = req.params.id;

    // db에서 user_item table을 가져오고 front로 전송
   
    // user의 id를 이용해서 DB의 user_item table에서 데이터를 가져온다.
    db.query(`select * from user_item where userid='${id}'`, (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
})

app.get('/api/userId', (req, res) => {
    //db에서 user table의 id값을 가져오고 front로 전송

    db.query(`select id from user`, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

app.get('/api/register/:reg_id/:reg_pw', (req, res) => {
    const reg_id = req.params.reg_id;
    const reg_pw = req.params.reg_pw;

    db.query(`INSERT user VALUES ('${reg_id}','${reg_pw}')`, (err, data) => {
        if (!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })

})

app.get('/api/userList', (req, res) => {

    // db에서 user_item table을 가져오고 front로 전송
   
    // user의 id를 이용해서 DB의 user_item table에서 데이터를 가져온다.
    db.query(`select * from user_item`, (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
})

// 장바구니에 추가
app.get('/api/addCart/:userId/:name/:id', (req, res) => {
    const userId = req.params.userId;
    const name = decodeURIComponent(req.params.name);
    const id = req.params.id;

    foodName = name + "_" + id;

    db.query(`UPDATE user_item SET ${foodName} = 1 WHERE (userid = '${userId}')`, (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
})

// 장바구니에서 삭제
app.get('/api/deleteCart/:userId/:name/:id', (req, res) => {
    const userId = req.params.userId;
    const name = decodeURIComponent(req.params.name);
    const id = req.params.id;

    foodName = name + "_" + id;

    db.query(`UPDATE user_item SET ${foodName} = 0 WHERE (userid = '${userId}')`, (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
})

const port = 5000; // server port
app.listen(port, () => {
    console.log(`Server On: ${port}`);
})