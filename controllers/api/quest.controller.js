var config = require('config.json');
var express = require('express');
var router = express.Router();
var questService = require('services/quest.service');
const mongoClient = require("mongodb").MongoClient;
// routes

router.get('/getall', getAll);
router.get('/getbynum', getByNum);

module.exports = router;

function getAll(req, res) {
    mongoClient.connect(config.connectionString, function(err, client){
        client.db("test").collection("Quest").find({ block: 1, num: {$gt :190} }).toArray(function(err, quest){
            res.send(quest)
            client.close();
        });
    });
}

function getByNum(req, res) {
    
    res.send("here mast be quest by num");
}