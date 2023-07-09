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

app.post("/api/orders/insert", (req, res) => {
    const { userId, productsId, quantity } = req.body;

    const sqlInsert = "INSERT INTO med7.orders (fk_users_id, fk_product_id, quantity)VALUES ((SELECT id FROM med7.users WHERE id =(?)), (SELECT id FROM med7.products WHERE id =(?)), (?));";

    db.query(sqlInsert, [userId, productsId, quantity], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/order/update", (req, res) => {
    const quantity = req.body.quantity;
    const userId = req.body.userId;
    const productId = Number(req.body.productId);
    const date = req.body.date;

    // console.log(req.body);

    const sqlInsert = "UPDATE med7.orders SET quantity = (?), confirmed = true, date = (?) WHERE fk_users_id = (?) AND fk_product_id = (?)";

    db.query(sqlInsert, [quantity, date, userId, productId], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/order/update/nco", (req, res) => {
    const quantity = req.body.quantity;
    const userId = req.body.userId;
    const productId = Number(req.body.productId);

    const sqlInsert = "UPDATE med7.orders SET quantity = (?), confirmed = false WHERE fk_users_id = (?) AND fk_product_id = (?)";

    db.query(sqlInsert, [quantity, userId, productId], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/order/update/sended-date", (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const dateSended = req.body.date;

    const sqlInsert = "UPDATE med7.orders SET sended = true, date_sended = (?) WHERE fk_users_id = (?) AND fk_product_id = (?) AND confirmed = true";

    db.query(sqlInsert, [dateSended, userId, productId], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/order/cancel/sended0", (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;

    const sqlInsert = "DELETE FROM med7.orders WHERE confirmed = 1 AND sended = 0 AND fk_users_id = (?) AND fk_product_id = (?);";

    db.query(sqlInsert, [userId, productId], (error, result) => {
        if (error) {
            console.log(error);
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/order/cancel/sended1", (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;

    const sqlInsert = "DELETE FROM med7.orders WHERE confirmed = 1 AND sended = 1 AND fk_users_id = (?) AND fk_product_id = (?);";

    db.query(sqlInsert, [userId, productId], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/orders/get", (req, res) => {
    const userId = req.body.userId;

    const sqlInsert = "SELECT * FROM med7.orders WHERE fk_users_id = (?)";

    db.query(sqlInsert, [userId], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/delete/order", (req, res) => {
    const { userId, productsId } = req.body;
    const sqlDelete = "DELETE FROM med7.orders WHERE confirmed = 0 AND fk_users_id = (?) AND fk_product_id = (?);";
    db.query(sqlDelete, [userId, productsId], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/delete-confirmed/order", (req, res) => {
    const { userId, productsId } = req.body;
    const sqlDelete = "DELETE FROM med7.orders WHERE fk_users_id = (?) AND fk_product_id = (?) AND confirmed = 1;";
    db.query(sqlDelete, [userId, productsId], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.post("/api/admin/orders/get", (req, res) => {

    const sqlInsert = "SELECT * FROM med7.orders WHERE sended = 0 AND confirmed = 1 ORDER BY date ASC;";

    db.query(sqlInsert, [], (error, result) => {
        if (error) {
            return res.json("Error");
        }
        // console.log(result);
        return res.json(result);
    });
});

app.post("/api/order/update/quantity", (req, res) => {
    const userId = Number(req.body.userId);
    const productId = Number(req.body.productId);
    const quantity = req.body.quantity;
    const date = req.body.date;

    const sqlInsert = "UPDATE med7.orders SET quantity = (?), date = (?), confirmed = 1 WHERE fk_users_id = (?) AND fk_product_id = (?)";

    db.query(sqlInsert, [quantity, date, userId, productId], (error, result) => {
        if (error) {
            console.log(error);
            return res.json("Error");
        }
        // console.log(result);
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

app.post("/api/join/products-users/get", (req, res) => {

    const sqlGet = " SELECT u.`id` AS `userid`, u.`name`, u.`family_name`, u.`email`,u.`phone`,u.`city`,u.`street`,u.`street_number`, p.`id` AS `productid`, p.`title`, p.`weight`, p.`price`, p.`picture`, o.`quantity`, o.`date`, o.`sended` FROM `users` AS u JOIN `orders` AS o ON u.`id` = o.`fk_users_id` JOIN `products` AS p ON p.`id` = o.`fk_product_id` WHERE o.`confirmed` = 1 ORDER BY o.date ASC;";

    db.query(sqlGet, [], (error, result) => {

        if (error) {
            return res.json("Error");
        }
        // console.log(result);
        return res.json(result);
    });

});

app.listen(5000, () => {
    console.log("Сървърът е стартиран на порт 5000");
});