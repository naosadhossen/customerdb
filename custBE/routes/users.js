const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Customer = require('../models/customers');
const { callbackify } = require('util');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register customer'});
    } else {
      res.json({success: true, msg: 'Customer registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
console.log(username);
  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});


// Register Customer
router.post('/addcustomer', passport.authenticate('jwt', {session:false}),(req, res, next) => {
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


//API to find by name
router.post('/getcustomerbyname',passport.authenticate('jwt', {session:false}),(req, res, next)=>{
  const name = req.body.name;
  console.log(name);
  Customer.getCustomerByUsername(name, (err,name)=>{
    if (err) throw err;
    if (!name) {
      console.log("Nothing found")
      res.send({msg:"Nothing found"})};
    if (name){
      console.log(name);
      res.send({name:name.phone})
    }
  })
});

//API to find by email
router.post('/getcustomerbyemail',passport.authenticate('jwt', {session:false}),(req, res, next)=>{
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

//API to find by country
router.post('/getcustomerbycountry',passport.authenticate('jwt', {session:false}),(req, res, next)=>{
  const country = req.body.country;
  console.log(country);
  Customer.getCustomerByCountry(country, (err,name)=>{
    if (err) throw err;
    if (!name.name) {
      console.log("Nothing found")
      res.send({msg:"Nothing found"})};
    if (name.name){
      console.log(name);
      res.send({name})
    }
  })
});

//Get All Customer Info
router.get('/getallcustomers', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Customer.getAllCustomer(anything,(err,allCustomers)=>{
    res.send(allCustomers);
  });
  
  });



//API Customer
router.get('/customer',(req, res, next)=>{
  res.send("it is ok")
});
module.exports = router;
