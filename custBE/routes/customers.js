const express = require('express');
const customerrouter = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Customer = require('../models/customers');
const { callbackify } = require('util');
const { resourceLimits } = require('worker_threads');


// Testing Customers Router
customerrouter.get('/customer',(req, res, next)=>{
    res.send("It is coming from Customer Route")
  });

// Register a Customer
customerrouter.post('/addcustomer', passport.authenticate('jwt', {session:false}),(req, res, next) => {
  let newCustomer = new Customer ({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    country: req.body.country
  });

  Customer.addCustomer(newCustomer, (err, customer) => {
    if(err) {
      console.log(err);
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

//API to find customer by name
customerrouter.post('/getcustomerbyname',passport.authenticate('jwt', {session:false}),(req, res, next)=>{
  const name = req.body.name;
  console.log(name);
  Customer.getCustomerByUsername(name, (err,name)=>{
    if (err) throw err;
    if (!name) {
      console.log("Nothing found")
      res.send({msg:"Nothing found"})};
    if (name){
      console.log(name);
      res.send({name})
    }
  })
});

//API to find customer by email
customerrouter.post('/getcustomerbyemail',passport.authenticate('jwt', {session:false}),(req, res, next)=>{
  const email = req.body.email;
  console.log(email);
  Customer.getCustomerByEmail(email, (err,name)=>{
    if (err) throw err;
    if (!name) {
      console.log("Nothing found")
      res.send({msg:"Nothing found"})};
    if (name){
      console.log(name);
      res.send({name})
    }
  })
});

//API to find customer by country
customerrouter.post('/getcustomerbycountry',passport.authenticate('jwt', {session:false}),(req, res, next)=>{
  const country = req.body.country;
  console.log(country);
  Customer.getCustomerByCountry(country, (err,customer)=>{
    if (err) throw err;
    console.log(customer)
    //res.send({name})
  if (!customer) {
   console.log("Nothing found")
  res.send({msg:"Nothing found"})};
  if (customer){
      console.log(customer);
      res.send({customer})
   }
 });
});

//Get All Customer Info
customerrouter.get('/getallcustomers', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Customer.getAllCustomer((err,allCustomers)=>{
    // console.log(allCustomers);
    res.send(allCustomers);
  });
  
  });



module.exports = customerrouter;