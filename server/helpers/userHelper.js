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

  // registerUser: (userData) => {
  //   return new Promise((resolve, reject) => {
  //     db.get()
  //       .collection(collection.USER_COLLECTION)
  //       .insertOne(userData)
  //       .then(() => {
  //         resolve();
  //       });
  //   });
  // },

  storeAuthUserData: (userData, OTP) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.AUTH_USER_COLLECTION)
        .insertOne({ ...userData, otp: OTP })
        .then(() => {
          resolve();
        });
    });
  },
  checkAuthUserExist: (mailId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.AUTH_USER_COLLECTION)
        .findOne({ email: mailId })
        .then((result) => {
          resolve(result);
        });
    });
  },
  updateAuthUserData: (id, otp,userData) => {
    return new Promise((resolve, reject) => {

      const { firstName, lastName, password } = userData;
      db.get()
        .collection(collection.AUTH_USER_COLLECTION)
        .updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              password: password,
              otp: otp,
            },
          }
        )
        .then(() => {
          resolve();
        });
    });
  },
};
