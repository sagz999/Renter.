const db = require("../config/dbConnection");
const collection = require("../config/collections");
const { ObjectId } = require("mongodb");
const res = require("express/lib/response");

module.exports = {
  duplicateUserCheck: (email) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: email })
        .then((userExist) => {
          resolve(userExist);
        });
    });
  },

  registerUser: (userData) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then(() => {
          resolve();
        });
    });
  },
};
