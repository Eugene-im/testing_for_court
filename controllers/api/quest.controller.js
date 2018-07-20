var config = require('config.json');
var express = require('express');
var router = express.Router();
var questService = require('services/quest.service');
const mongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
const QuestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    block : Number,
    num : Number,
    question : String,
    variant : [ 
        {
            text : String,
            value : Boolean
        }, 
        {
            text : String,
            value : Boolean
        }, 
        {
            text : String,
            value : Boolean
        }, 
        {
            text : String,
            value : Boolean
        }
    ]
});
var Quest = mongoose.model('Quest', QuestSchema);
const db = mongoose.connection;

// routes

router.get('/getall', getAll);
router.get('/getbynum', getByNum);

module.exports = router;

function getAll(req, res) {
            Quest.aggregate().sample(40).then((err, Quest) => res.send(Quest));
            // Quest.aggregate().sample(40).exec((err, Quest) => 
            // res.send(Quest.aggregate().sample(40));
}

function getByNum(req, res) {
    
    res.send("here mast be quest by num");
}