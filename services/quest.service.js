var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('Quest');

var service2 = {};
var num = "5";

service2.getByNum = getByNum;
service2.getAll = getAll;

module.exports = service2;

function getByNum(num) {
    var deferred = Q.defer();
    db.quest.find({num: num});
    console.log(db.quest.find({num: num}))
    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();
    db.Quest.find({});
    console.log(db.Quest.find({}));
    return deferred.promise;
}