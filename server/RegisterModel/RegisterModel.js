const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const {Schema} = mongoose;
const bcrypt = require("bcryptjs");

const RegisterSchema = new Schema({
    _id: {type: String},
    username: {type: String, unique: true},
    password: {type: String},
    email : {type: String, unique: true},
    registerDate: {type: Date}
})

RegisterSchema.pre("save", async function(next){
   this.password = await bcrypt.hash(this.password, 12);
   next();
})

RegisterSchema.methods.comparePassword = async function(providedPass, pass){
   return await bcrypt.compare(providedPass, pass);
}

RegisterSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Accounts", RegisterSchema);