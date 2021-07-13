
// database config
const config = { server: 'localhost', port: '3306', database: 'rent_a_car', user: 'root', password: '' };

const mysqliter  =require('../index');

mysqliter.connect(config , {
    //useFindAndModify: false 
});

// import model
const Car = require('./models/car');
const Schedule = require('./models/schedule');

// test query 
/*
Car.find()
   .where('id').equals(16)
   .exec(function(err, result){
       if(err){
           console.log('err :', err);
       }else{
           console.log("result :", result);
       }
   });
*/



Schedule.find(' date = "2021-10-17" ')
        //.where('date').equals('2021-10-16')
        //.where('carID').equals(16)
        //.where('bookingID').equals(null)
        // .where('bookingID').isNull()
        //.limit(1)
        .exec(function(err, schedule){
            if (err) {
                console.log("err ::",err); 
            } else {
                console.log("schedule ::", schedule);
            }                   
        })   