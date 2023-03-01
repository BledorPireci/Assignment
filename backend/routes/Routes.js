const queries = require('./services/user.service');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();


const database = require('../util/database')
const userQuery = require("./services/user.service");
const connection = database.getDbConnection();

app.use(express.json());

app.get ("/users", async (req, res) => {
    results = await queries.getUsers(connection);
    res.send(results);
    res.status(200);
});


app.post("/login", async (req, res) => {
    const email = req.body.email;
    const user = await userQuery.getUserById(connection, email);
    if (! await userQuery.emailExists(connection, email)) {
        res.status(200);
        res.json({"msg": "Invalid Credentials"});
    }
    try {
        if (await bcrypt.compare(req.body.password, user.UserPassword)) {
            const userJson = {"user": email};
            const token = jwt.sign(userJson, "secret");
            res.status(200);
            res.json({"token": `${token}`});
        } else {
            res.status(200);
            res.json({"msg": "Invalid Credentials"});
        }
    } catch (error){
        console.error(error);
        return res.status(500).json({
            msg: error,
        });
    }
});

app.post ("/register" , async ( req , res ) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        if (await userQuery.emailExists(connection, req.body.email)) {
            res.json({"msg":"account already exists"});
            res.status(200).send();
            return;
        }
        userQuery.insertUser(connection, req.body.email, hashedPassword
            ,req.body.userName);
        const user = {"user": req.body.email};
        const token = jwt.sign(user, "secret");
        res.json({"token": token});
        res.status(200);

    } catch {
        return res.status(500).json({
            msg: 'Internal server error',
        });
    }
});

app.delete (/user\/:.+/, auth.authenticateToken,
    async (req, res) => {
    id = req.url.split(':')[1];
    await userQuery.deleteUser(connection, id);
    return res.status(200).json({
        msg: `successfully deleted record number: ${id}`,
    });
});



app.listen(3000);


