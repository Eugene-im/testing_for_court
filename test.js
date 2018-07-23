

var config = require('./config.json');
const mongodb = require("mongodb").MongoClient;


async function getAll() {
    try {
        const db = await mongodb.connect(config.connectionString);
        console.log('Ok')
        let questCont = {blockCount:[],numInBlock:[]};
    
        questCont.blockCount = await db.collection("Quest").distinct("block");
    
        for (let block in questCont.blockCount)  {
            questCont.numInBlock[block] = await db.collection("Quest").find({ block: questCont.blockCount[block]}).count();
        }      
    } catch (error) {
        console.error(error);
    }
};

getAll();

