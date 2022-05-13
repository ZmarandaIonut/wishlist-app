const mongoose = require("mongoose");
const {Schema} = mongoose;

const WishlistSchema = new Schema({
    _id: {type: Number},
    wishlistName: {type:String, required: true},
    items: [],
    ownedBy: {type: String, required: true},
    registerDate: {type: Date}
})

module.exports = mongoose.model("Wishlists", WishlistSchema);