# mysqliter
mysql wrapper for object query builder(dev stage)

## Create Model

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
