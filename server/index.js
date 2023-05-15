const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123",
    database: "med7"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM med7.products";
    db.query(sqlGet, (error, result) => {
        if (error) {
            return res.json("Error");
        } else if (result.length > 0) {
            return res.json("Success");
        } else {
            return res.json("False");
        }
    });
});

// app.get("/", (req, res) => {
//     res.send("");
// });

app.post("/api/post", (req, res) => {
    const { email, password } = req.body;
    const sqlInsert = "INSERT INTO med7.users (email, password) VALUES (?, ?)";
    db.query(sqlInsert, [email, password], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const sqlInsert = "SELECT * FROM med7.users WHERE email = (?) && password = (?)";
    // console.log(sqlInsert);

    db.query(sqlInsert, [email, password], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/orders", (req, res) => {
    const { userId, productsId, quantity } = req.body;
    const sqlInsert = "INSERT INTO med7.orders (fk_users_id, fk_product_id, quantity)VALUES ((SELECT id FROM med7.users WHERE id =(?)), (SELECT id FROM med7.products WHERE id =(?)), (?));";

    db.query(sqlInsert, [userId, productsId, quantity], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/orders/get", (req, res) => {
    const  {userId}  = req.body;
    const sqlInsert = "SELECT fk_product_id FROM med7.orders WHERE fk_users_id = (?)";
    // console.log(userId);

    db.query(sqlInsert, [userId], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        // res.send(JSON.stringify(result));
        return res.json(result);
        // console.log(result);
        //  console.log(error);
    });
    // console.log(dd);
});

app.put("/api/post", (req, res) => {
    const { email, password } = req.body;
    const sqlInsert = "INSERT INTO med7.users (email, password) VALUES (?, ?)";
    db.query(sqlInsert, [email, password], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.listen(5000, () => {
    console.log("Сървърът е стартиран на порт 5000");
})