const modelName = 'schedule'; // this is bill model to make payment using
//const mysqliter = require('../calculate/querygen');
// const mysqliter = require('mysqliter');
const mysqliter = require('../../index');

//const Schema = mysqliter.Schema;

// let schema = new Schema({
//     //_id: { type: Number, ref: modelName, index: true },

     
// });

const schema = {};



module.exports = mysqliter.model(modelName,schema);