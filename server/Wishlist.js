const mongoose = require("mongoose");
const WishlistModel = require("./WishlistsModel/WishlistMode")
class Wishlist{

    static createWishlist(payload, name, owner){    
        return new Promise((resolve, reject) => {

            let nextID;

            WishlistModel.find().then(result => {
                if(result.length === 0){
                    nextID = 0;
                }
                else{
                    nextID = result[result.length-1]["_id"] + 1;
                }

                const newWishlist = new WishlistModel({
                    _id: nextID,
                    wishlistName: name,
                    items: payload,
                    ownedBy: owner,
                    registerDate: Date().toString(),
                });
                newWishlist.save()
                    .then(() => resolve("wishlist created!"))
                    .catch((err) => {
                     reject("fail to create an wishlist")
                });

            })
              .catch(err => console.log(err));    

        })
 
    }
   static getuserwishlist(userID){
       return new Promise((resolve, reject) => {
           WishlistModel.find({ownedBy: userID})
              .then(result => resolve(result))
              .catch(err => reject(err));
       })
   }

   static getwishlistByID(wishlistID){
       return new Promise((resolve, reject) => {
           WishlistModel.find({_id: wishlistID})
             .then(result => resolve(result))
             .catch(err => reject(err));
       })
   }

  static updateWishlistById(filter, content){
      return new Promise((resolve, reject) => {
          WishlistModel.findOneAndUpdate(filter, content, {new: true})
             .then(result => resolve(result))
             .catch(err => reject(err));
      })
  }

  static deleteWishlist(wishlistID){
      return new Promise((resolve, reject) => {
          WishlistModel.findOneAndDelete({_id: wishlistID})
            .then(result => resolve(result))
            .catch(err => reject(err));
      })
  }
}
module.exports = Wishlist;