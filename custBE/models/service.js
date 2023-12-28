
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// Customer Service Schema
const CustomerServiceSchema = mongoose.Schema ({
    name: {
      type: String,
      required: true
    },
    ServiceID: {
      type: String,
      required: true
    },
    Status: {
      type: String,
      required: true
    },
    ServiceContent: {
      type: String,
      required: true
    }
  });
  
  const CustomerService = module.exports = mongoose.model('CustomerService', CustomerServiceSchema);

    //create service ticket
    module.exports.createServiceTicket = function(newServiceTicket, callback) {
        newServiceTicket.save(callback);
      }