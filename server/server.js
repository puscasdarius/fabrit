var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var ejs = require('ejs');
const mongojs = require('mongojs');

var app = express();
var port = 8800;
var url = "mongodb://root:root@ds123695.mlab.com:23695/phone";
var db = mongojs(url,['countries','cities']);

//Set folder for views
app.set('views',path.join('../client','views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join('../client','')));

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
  res.render('new_task.html');
})
app.get("/statistics",function(req,res){
  res.render('statistics.html');
})

//Second page
//Obtain data for the first table
app.get('/get_data_statistics',getCountries,getCities);
//app.get('/get_data_table_1',getCountries,getCities);
//app.get('/get_data_table_2',getCountries,getCities);

function getCountries(req,res,next){
  db.countries.find(function(err,data){
    if(err) throw err;
    req.data = data;
    next();
  });
}
function getCities(req,res){
  var obj = {};
  var countries = req.data;
  db.cities.find(function(err,data){
    var cities = data;
    obj.countries = countries;
    obj.cities = data;
    res.json(obj);
  })
}
//------------------------------------------------

//Get inital data from db
app.get('/get_data',function(req,res){
  var result = {};
  db.countries.find(function(err,data){
    if(err) throw err;
    result.countries = data;
    res.json(result);
  });

})
//Send data to the db
app.post('/submit',function(req,res){
  var data = req.body;
  var pop_density = data.area/data.occ;
  var update = {
    $set:{occ:data.occ,area:data.area,pop_density:pop_density}
  }
  db.cities.update({_id:mongojs.ObjectId(data.city)},update,function(err){
    if(err) throw err;
    res.end();
  });
})

//Get cities' data by country id
app.get('/get_cities/:id',function(req,res){
  db.cities.find({"parent_id":req.params.id},function(err,data){
    if(err) throw err;
    res.json(data);
  });
})

app.listen(port,function(){
  console.log("Server Started on port:\t"+port);
})
