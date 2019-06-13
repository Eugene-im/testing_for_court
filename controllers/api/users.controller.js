var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.post('/add', addClient);
// router.post('/get', getClients);
router.get('/client/:name', getByClientname);
router.post('/user/:name', getByUsername);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);

router.get('/allusers', getUsers);
router.get('/allclients', getClients);
router.post('/foto', postFoto);

const mongoClient = require("mongodb").MongoClient;

async function getUsers(req, res) {
    let users = [];
    try {
        const db = await mongoClient.connect(config.connectionString);
        let cursor = await db.collection("users").find();
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            users.push(doc);
        }
        console.log('uu',users);
        db.close();
    } catch (error) {
        console.error(error);
    }finally{
        res.send(users)
    }   
}


async function getClients(req, res) {
    let clients = [];
    try {
        const db = await mongoClient.connect(config.connectionString);
        let cursor = await db.collection("client").find();
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            clients.push(doc);
        }
        console.log('uu',clients);
        db.close();
    } catch (error) {
        console.error(error);
    }finally{
        res.send(clients)
    }
}

// async function getClients(req, res) {
//     let client = [];
//     try {
//         const db = await mongoClient.connect(config.connectionString);
//         let cursor = await db.collection("client").find({});
//         for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
//             client.push(doc);
//         }
//         db.close();
//     } catch (error) {
//         console.error(error);
//         res.status(400).send(err);
//     } finally{
//         console.log("client");
//         if(client.length != 0) res.status(200).send(client);
//         else res.status(400).send("it's no client in client base");
//     }
// }




async function postFoto(req, res) {
    try {
        const db = await mongoClient.connect(config.connectionString);
        let cursor = await db.collection("users").insert({raw:"0x21332214235"});
        // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        //     users.push(doc);
        // }
        console.log('uu',cursor);
        db.close();
    } catch (error) {
        console.error(error);
    }finally{
        res.send('ok')
    }   
}

module.exports = router;

function authenticateUser(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.status(401).send('Логін чи пароль не співпадають');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function registerUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('Ви можете оновити лише власний обліковий запис');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

async function addClient(req, res) {

    // console.log(req.body,res.body);
    let data = req.body;
    let clientExist = false;
    try {
        const db = await mongoClient.connect(config.connectionString);
        let cursor = await db.collection("client").find();
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            if(doc.lastName == data.lastName && doc.firstName == data.firstName && doc.surName == data.surName){
                clientExist = true;
                break;
            } 
        }
        await db.collection("client").insert(data);
        db.close();
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    } finally{
        if (clientExist){
            res.status(400).send(`Client exist`);
        } else{
            res.sendStatus(200);
        }
    }
    // userService.addClientData(req.body)
    // .then(function () {
    //     res.sendStatus(200);
    // })
    // .catch(function (err) {
    //     res.status(400).send(err);
    // });
}


async function getByClientname(req,res){
    var data = req.params.name;
    let client= [];
    try {
        const db = await mongoClient.connect(config.connectionString);
        let cursor = await db.collection("client").find();
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            if(doc.lastName == data || doc.firstName == data || doc.surName == data){
                client.push(doc);
            } 
        }
        db.close();
    } catch (error) {
        console.error(error);
        res.status(400).send(err);
    } finally{
        if(client.length != 0) res.status(200).send(client);
        else res.status(400).send("it's no client with " + data + " name");        
    }
}

async function getByUsername(req,res){
    var data = req.params.name;
    let client= [];
    try {
        const db = await mongoClient.connect(config.connectionString);
        let cursor = await db.collection("users").find();
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            if(doc.lastName == data || doc.firstName == data || doc.surName == data){
                // перебрать варианты имен фамилий и т.д.
                client.push(doc);
            } 
        }
        db.close();
    } catch (error) {
        console.error(error);
        res.status(400).send(err);
    } finally{
        if(client.length != 0) res.status(200).send(client);
        else res.status(400).send("it's no user with " + data + " name");        
    }
}

function deleteUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('Ви можете видалити лише власний обліковий запис');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}