require("dotenv").config();
const mongoose = require("mongoose");
const RegisterModel = require("./RegisterModel/RegisterModel");
const { v4: uuidv4 } = require('uuid');
const Wishlist = require("./Wishlist");

const DB_CONNECTION = process.env.DB_INFO;

class DB extends Wishlist{
    static connect(){
        return new Promise((resolve, reject) => {
            mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                resolve("ok");
            })
            .catch(err => {
                reject(err.message);
            });
        })
    }

    static createAccount(username, password, email){ 
    
        return new Promise((resolve, reject) => {
            const newUser = new RegisterModel({
                _id: uuidv4(),
                username,
                password,
                email,
                registerDate : Date().toString()
            })
            newUser.save()
              .then((acc) => resolve(acc))
              .catch((err) => {
                  if(err.errors.username && err.errors.email){
                      reject("Username & Email already exist!");
                  }
                  if(err.errors.username){
                      reject("Username already exist!");
                  }
                  if(err.errors.email){
                      reject("Email already exist!");
                  }
                  reject("Fail to create account!");
              });
        })
    }

    static findAccount(user, pw){
         
        return new Promise((resolve, reject) => {
            RegisterModel.findOne({email: user})
            .then(res => {
                if(!res){
                    resolve("not match");
                }
                res.comparePassword(pw,res.password).then(match => {
                    if(match){
                      resolve({msg: "match", id: res._id});
                    }
                    else{
                        resolve({msg: "not match"});
                    }
                })
            })
            .catch(err => {
                reject(err.message)
            })
        })
    }
}

module.exports = DB;