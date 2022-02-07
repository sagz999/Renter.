const db = require("../config/dbConnection");
const collection = require("../config/collections");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

module.exports = {
  UserExistCheck: (email) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: email })
        .then((userExist) => {
          resolve(userExist);
        });
    });
  },

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
  updateAuthUserData: (id, otp, userData) => {
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

  updateAuthUserOTP: (userEmail, newOtp) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.AUTH_USER_COLLECTION)
        .updateOne({ email: userEmail }, { $set: { otp: newOtp } })
        .then(() => {
          resolve();
        });
    });
  },

  verifyUser: (data) => {
    return new Promise(async (resolve, reject) => {
      const { userEmail, OTP } = data;
      var authUser = await db
        .get()
        .collection(collection.AUTH_USER_COLLECTION)
        .findOne({ email: userEmail, otp: OTP });
      if (authUser) {
        const { otp, ...rest } = authUser;
        rest.GoogleAuth = false;
        rest.imageUrl = process.env.IMAGE_URL;
        db.get()
          .collection(collection.USER_COLLECTION)
          .insertOne(rest)
          .then(() => {
            db.get()
              .collection(collection.AUTH_USER_COLLECTION)
              .deleteOne({ _id: ObjectId(authUser._id) })
              .then(() => {
                db.get()
                  .collection(collection.USER_COLLECTION)
                  .findOne({ _id: ObjectId(authUser._id) })
                  .then((data) => {
                    const { password, ...rest } = data;
                    resolve(rest);
                  });
              });
          });
      } else {
        reject();
      }
    });
  },

  userLoginCheck: (loginData) => {
    return new Promise((resolve, reject) => {
      const { email, password } = loginData;
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: email })
        .then(async (userData) => {
          if (userData.password == null) {
            resolve(false);
          } else {
            let status = await bcrypt.compare(password, userData.password);
            if (status) {
              let { password, ...rest } = userData;
              resolve(rest);
            } else {
              reject();
            }
          }
        });
    });
  },

  googleUserSignUp: (userData) => {
    return new Promise(async (resolve, reject) => {
      let userCheck = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });

      if (userCheck) {
        reject();
      } else {
        let userDetails = {
          firstName: userData.givenName,
          lastName: userData.familyName,
          email: userData.email,
          imageUrl: userData.imageUrl,
          password: null,
          GoogleAuth: true,
        };
        db.get()
          .collection(collection.USER_COLLECTION)
          .insertOne(userDetails)
          .then(({ insertedId }) => {
            db.get()
              .collection(collection.USER_COLLECTION)
              .findOne({ _id: ObjectId(insertedId) })
              .then((user) => {
                const { password, ...rest } = user;
                resolve(rest);
              });
          });
      }
    });
  },

  googleUserLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });
      if (user) {
        if (user.GoogleAuth == true) {
          const { password, ...rest } = user;
          resolve(rest);
        } else {
          db.get()
            .collection(collection.USER_COLLECTION)
            .updateOne(
              { _id: ObjectId(user._id) },
              { $set: { GoogleAuth: true, imageUrl: userData.imageUrl } }
            )
            .then(() => {
              db.get()
                .collection(collection.USER_COLLECTION)
                .findOne({ _id: ObjectId(user._id) })
                .then((user) => {
                  const { password, ...rest } = user;
                  resolve(rest);
                });
            });
        }
      } else {
        reject();
      }
    });
  },

  setOtpToResetPass: (otp, userId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: ObjectId(userId) },
          { $set: { resetPassOTP: otp } },
          { upsert: true }
        )
        .then(() => {
          resolve();
        });
    });
  },

  resetPasswordAuthenticate: (authData) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: authData.userEmail, resetPassOTP: authData.OTP })
        .then((user) => {
          if (user) {
            resolve();
          } else {
            reject();
          }
        });
    });
  },

  changePassword: (passData) => {
    return new Promise((resolve, reject) => {
      console.log(passData)
      db.get().collection(collection.USER_COLLECTION).updateOne({email:passData.email})
    })
  }
};
