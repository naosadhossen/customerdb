
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// Customer Schema
const CustomerSchema = mongoose.Schema ({
    name: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    country: {
        type: String,
        required: true
      }
  });
  
  const Customer = module.exports = mongoose.model('Customer', CustomerSchema);

  //Add Customer
  module.exports.addCustomer = function(newCustomer, callback) {
    newCustomer.save(callback);
  }
  
  //Find Customer
  module.exports.geCustomerById = function(id, callback) {
  Customer.findById(id, callback);
  }
  
  module.exports.getCustomerByUsername = function(name, callback) {
  console.log(name);
  const query = {name:name};
  Customer.findOne(query, callback);
  }

  module.exports.getCustomerByEmail = function(email, callback) {
    const query = {email:email};
    Customer.findOne(query, callback);
    }
  
  module.exports.getCustomerByCountry = function(country, callback) {
    const query = {country:country};
    Customer.find(query, callback);
  }

module.exports.getAllCustomer = function(callback){
  Customer.find({},callback);
  //console.log(result);
}