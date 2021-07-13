# mysqliter
mysql wrapper for object query builder(dev stage)

## Initiate Mysql Database   

```javascript
const config = {
  server: 'localhost',
  port: '3306',
  database: 'database_name',
  user: 'root',
  password: 'pass'
};

const mysqliter  =require('mysqliter');
mysqliter.connect(config , {
    //useFindAndModify: false
});
```

## Create Model    

```javascript
const modelName = 'vender';
const mysqliter = require('mysqliter');

const schema = {};

module.exports = mysqliter.model(modelName,schema);
```

## Select Query

```javascript
const vender = require('../../../common/models/vender');
vender.find()
      .where('contactNumber').equals('0703032901')
      .select('firstName lastName')
      .limit(1)
      .exec(function (err, result){       
         if(err){
            console.log("find error : ", err);
         }else{
             console.log("find result : ", result);
         }
      });
```

## Update Query

```javascript
const vender = require('../../../common/models/vender');
vender.update({firstName: 'ppd'})
      .where('contactNumber').equals('0703032901')
      .exec(function (err, result){
         if(err){
            console.log("update error : ", err);
         }else{
             console.log("update result : ", result);
         }
});
```

## Insert Query

```javascript
const vender = require('../../../common/models/vender');


const insertdata={
    firstName:"samadhi",
    lastName:"laksahan",
    contactNumber:"0713664198",
    password:"12345",
}

vender.insert(insertdata)
      .exec(function (err, result){
        if(err){
           console.log("test error : ", err);
        }else{
            console.log("test result : ", result);
        }
      });

```

## Use Native Query Condition

```javascript
const vender = require('../../../common/models/vender');

vender.find('contactNumber= "0703032901" ')
      .select('firstName lastName')
      .limit(1)
      .exec(function (err, result){       
         if(err){
            console.log("find error : ", err);
         }else{
             console.log("find result : ", result);
         }
      });
```

## selecting conditions

builder | query
--- |  ---
*.where(firstname).equals('sam')* | firstname='sam'
*.where(age).gt(25)* |  age > 25
*.where(age).gte(25)* |  age >= 25
*.where(age).lt(25)* |  age < 25
*.where(age).lte(25)* |  age <= 25
*.where(age).lt(35).where(age).gt(25)* |  age < 35 AND age > 25
*.or(age).lt(35).or(age).gt(25)* |  age < 35  OR > 25
*.where(firstname).equals(null)* |  firstname IS NULL
*.where(firstname).isNull()* |  firstname IS NULL
*.find(' date = "2021-10-17" ')* |  date = "2021-10-17"
