const express = require('express');
const serviceroute = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Customer = require('../models/customers');
const Service =require('../models/service');
const { callbackify } = require('util');


//API Customer
serviceroute.get('/service',(req, res, next)=>{
    res.send("It is coming from Service Route")
  });

// Register
serviceroute.post('/createserviceticket', passport.authenticate('jwt', {session:false}),(req, res, next) => {
    let newServiceTicket = new Service ({
      name: req.body.name,
      ServiceID: req.body.ServiceID,
      Status: req.body.Status,
      ServiceContent: req.body.ServiceContent
    });
  console.log (newServiceTicket);
    Service.createServiceTicket(newServiceTicket, (err, ticket) => {
      if(err) {
        res.json({success: false, msg: 'Failed to create service ticket '});
      } else {
        res.json({success: true, msg: 'Service ticket created'});
      }
    });
  });

module.exports = serviceroute;