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

const port = 5000; // server port
app.listen(port, () => {
    console.log(`Server On: ${port}`);
})