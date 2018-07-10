var config = require('config.json');
var express = require('express');
var router = express.Router();
var questService = require('services/quest.service');

// routes

router.get('/getall', getAll);
router.get('/getbynum', getByNum);

module.exports = router;

function getAll(req, res) {
    res.send("here mast be all quest");
}

function getByNum(req, res) {
    res.send("here mast be quest by num");
}