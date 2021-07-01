const mysql = require('mysql');


function Model(name, schema, config){

    /**
     * table name as model name will assign when init model
     * @type {string}
     */
    this.table= name; 

    /**
     * config for mysql conndection
     * @type {Object}
     */
    this.config= config; 

    /**
     * query - builded mysql query
     * @type {string}
     */
    this.query='';
    this.selects=''; 
    this.condition='';
    this.limits='';
    this.updates= '';
    this.inserts={fields:null, values:null};
    this.generateQuery;
    this.tempf='';// temp field
    this.leans= false;

    /**
     * clear - clear all variables
     * @type {Function}
     */
    this.clear= function(){
        //this.query='';
        this.selects=''; 
        this.condition='';
        this.limits='';
        this.leans= false;
    }

    this.QSelect= function(){
        this.query= `SELECT ${this.getSelect()}  FROM ${this.table}  ${this.getCondition()} ${this.getLimit()}  `;
    }
    this.QUpdate= function(){
        /**
         * UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition; 
         */
        this.query= `UPDATE ${this.table} SET ${this.getUpdate()}  ${this.getCondition()}`;
    }
    this.QInsert= function(){
        /**
         * INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...); 
         */
        this.query= `INSERT INTO ${this.table} ${this.getInsert()}`;
    }
    this.QDelete= function(){
        this.query= `DELETE FROM ${this.table}`;
    }

    /** generate query
     * 
     * 
     */
    this.getSelect= function(){
        return this.selects ? `${this.selects}`  : '*';
    }
    this.getLimit= function(){
        return this.limits ?  `limit ${this.limits}` : '';  
    }
    this.getSort= function(){
        return this.condition ? '' : `WHERE ${this.condition}`;  
    }
    this.getCondition= function(){
        return this.condition ?  `WHERE ${this.condition}` :  '';  
    }
    this.getUpdate= function(){
        return this.updates;  
    }
    this.getInsert= function(){
        return `(${this.inserts.fields}) VALUES (${this.inserts.values})`;
    }

    /** generate query
     * 
     * 
     */
    this.find= function(){
        this.clear();
        this.generateQuery = this.QSelect;
        return this;
    }
    this.update= function(obj){
        this.clear();
        this.updates = Object.keys(obj).map(key=> `${key}=${ this.isNumber(obj[key]) ? obj[key] : "'"+obj[key]+"'" }`).join(',');
        this.generateQuery = this.QUpdate;
        return this;
    }
    this.insert= function(obj){
        this.clear();
        this.inserts.fields   = Object.keys(obj).join(',');
        this.inserts.values   = Object.values(obj).map(value=> `${ this.isNumber(value) ? value : "'"+value+"'" }`).join(',');
        this.generateQuery = this.QInsert;
        return this;
    }
    this.lean= function(){
        this.leans= true;
        return this;
    }


    /** check
     * 
     * @returns {any}
     */

    this.isNumber = function(value) {
        return typeof value === 'number' && isFinite(value);
      }
      
    /** operator query
     * 
     * @returns {any}
     */
    this.where= function(field){
        this.condition += this.condition ?  ' AND ' : '';
        this.tempf= field;
        return this;
    }
    this.or= function(field){
        this.condition += this.condition ?  ' OR ' : '';
        this.tempf= field;
        return this;
    }
    this.equals= function(value){
        this.condition += `${this.tempf}= ${this.isNumber(value) ? value : "'"+value+"'"}`;
        return this;
    }
    this.eq= function(value){
        return this.equals(value);
    }
    this.gt= function(value){
        this.condition += `${this.tempf}  > ${this.isNumber(value) ? value : "'"+value+"'"}`;
        return this;
    }
    this.gte= function(value){ // greater than or equals
        this.condition += `${this.tempf}  >= ${this.isNumber(value) ? value : "'"+value+"'"}`;
        return this;
    }
    this.lt= function(value){
        this.condition += `${this.tempf}  < ${this.isNumber(value) ? value : "'"+value+"'"}`;
        return this;
    }
    this.lte= function(value){ // less than or equals
        this.condition += `${this.tempf}  <= ${this.isNumber(value) ? value : "'"+value+"'"}`;
        return this;
    }
    this.in= function(){
        
        return this;
    }

    /** filtering
     * 
     * @returns {any}
     */
    this.select= function(fields){
        this.selects=  fields.split(/[ ,]+/).join(',');  
        return this;
    }
    this.limit= function(value){ 
        this.limits= value;  
        return this;
    }


    /** save query
     * 
     * @returns {any}
     */
    this.save= function(){
        console.log("hit save button....");
        //return this;
    }

    this.exec= function(cb){
        this.generateQuery();
        const query= this.query;
        const config= this.config;

        try {

            const connection = mysql.createConnection(config);
            connection.connect(function (err) {
                if (err) {
                    connection.end();
                    cb(err, null); 
                } else {
                    connection.query(query, function (err, result) {
                        connection.end();                        
                        cb(err,result);
                    });
                }
            });
        } catch (err) {
            cb(err, null); 
        }

    }
    
}




function Mysqliter(){

    this.config;

    this.model= function(name, schema){
        return new Model(name, schema, this.config);
    }

    this.schema= function(name){
        console.log("set schema....");
    }
    this.connect= function(config){
        this.config = config;
    }


}



module.exports =  new Mysqliter();
