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

app.post("/api/product/get", (req, res) => {
    const id = req.body.productId;
    const sqlGet = "SELECT * FROM med7.products WHERE id = (?)";
    db.query(sqlGet, [id], (error, result) => {

        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });

});

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
    const userId = req.body.userId;
    // console.log(req.body);

    const sqlInsert = "SELECT fk_product_id, quantity FROM med7.orders WHERE fk_users_id = (?)";

    db.query(sqlInsert, [userId], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/user/get", (req, res) => {
    const id = req.body.userId;
    // console.log(id);

    const sqlInsert = "SELECT * FROM med7.users WHERE id = (?)";

    db.query(sqlInsert, [id], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        // console.log(result);
        // console.log(res.json(result));
        return res.json(result);
        // return result;
    });
    // console.log(dd);
});

app.post("/api/user/update", (req, res) => {
    const name = req.body.userData.name;
    const family_name = req.body.userData.family_name;
    const phone = req.body.userData.phone;
    const city = req.body.userData.city;
    const street = req.body.userData.street;
    const street_number = Number(req.body.userData.street_number);
    const picture = req.body.userData.picture;
    const id = req.body.userData.id;

    const sqlInsert = "UPDATE med7.users SET name = (?), family_name = (?), phone = (?), city = (?), street = (?), street_number = (?), picture = (?) WHERE id = (?)";

    db.query(sqlInsert, [name, family_name, phone, city, street, street_number, picture, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/user/delete", (req, res) => {
    const is_active = req.body.userData.is_active;

    console.log(is_active);

    const sqlInsert = "UPDATE med7.users SET is_active = false WHERE id = (?)";

    db.query(sqlInsert, [is_active, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.json("Error");
        }
        console.log(result);
        // console.log(res.json(result));
        return res.json(result);
    });
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

app.post("/api/delete/order", (req, res) => {
    const { userId, productsId } = req.body;
    const sqlDelete = "DELETE FROM med7.orders WHERE fk_users_id = (?) AND fk_product_id = (?);";
    db.query(sqlDelete, [userId, productsId], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.listen(5000, () => {
    console.log("Сървърът е стартиран на порт 5000");
});