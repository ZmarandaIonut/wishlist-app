const DB = require("../DB");
const jwt = require("jsonwebtoken");
const og = require('open-graph');


exports.checkHomePageAcces = (req,res) => {
    res.status(200).json({msg: "allowed"});
}

exports.loginUser =  (req, res) => {
    DB.findAccount(req.body.email, req.body.password)
        .then(result => {
            if(result.msg === "match"){
                const sendToken = jwt.sign({ id: result.id }, process.env.SECRET_KEY);
                res.status(200).json({
                    msg:"match",
                    id: result.id,
                    token: sendToken
                })
            }
            else{
                res.status(404).json({
                    msg: "not match"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "server error"
            })
        });

}

exports.signinUser = (req,res) => {
    DB.createAccount(req.body.username, req.body.password, req.body.email)
      .then(result => {
          console.log(process.env.SECRET_KEY)
        const sendToken = jwt.sign({ id: result.id }, process.env.SECRET_KEY);
        res.json({userid: result._id, token: sendToken});
      })
      .catch(err => {
          console.log(err);
       if(err.includes("Username") || err.includes("Email")){
         return res.status(400).json({
               msg: err
            })
       }
       res.status(500).json({
           msg: "Server error!"
       });
      })
}
exports.getItem = (req, res) => {
    const url = req.body.url;
    const getItemInfo = new Promise((resolve, reject) => {
        og(url, function (err, meta) {
            if(!err){
                resolve(meta);
            }
            reject("error");
          });
    })

    getItemInfo.then(result => res.json(result)).catch(err => res.status(404).json({msg: "not found"}));
}

exports.getWishlistById =  (req,res) => {
    const userID = req.params.id;
    DB.getuserwishlist(userID).then(result => {
        res.json({payload: result});
    })
    .catch(err => console.log(err));
}

exports.createWishlist = (req, res) => {
    const wishlistName = req.body.wishlistname;
    const payload = req.body.payload;
    const owner = req.body.owner;
    DB.createWishlist(payload, wishlistName, owner)
        .then(result => res.json({msg: "succes"}))
        .catch(result => res.json({msg: "fail"}));
}

exports.getWishlistProducts = (req,res) => {
    const wishlistID = req.params.id;
    DB.getwishlistByID(wishlistID)
      .then(result => {
          if(result.length > 0){
            res.json({items: result[0].items});
          }
          else{
              res.json({items: []})
          }
      })
      .catch(err => res.json({msg: "fail"}));
}

exports.verifyWishlistEditAccces = (req,res) => {
    const wishlistID = req.params.id;
    const clientID = req.body.clientID;
    DB.getwishlistByID(wishlistID)
       .then(user => {
         if(user.length > 0){
           if(clientID === user[0].ownedBy){
               return res.json({msg: "allowed"})
            }
         }
          return res.json({msg: "not allowed"})
       })
       .catch(err => res.json({msg: "fail"}));
}

exports.editWishlistByID = (req, res) => {
    const wishlistID = req.params.id;

    if(req.body.action === "add"){
        const recivedProduct = req.body.product;
        DB.updateWishlistById({_id: wishlistID}, {items: recivedProduct})
        .then(result => res.json({msg: "succes"}))
        .catch(err => res.json({msg: "fail"}));
    }
    else if(req.body.action === "edit"){
        const productID = req.body.productID;
        DB.updateWishlistById({_id: wishlistID, "items.id": productID}, {$set : {"items.$.purchased": true}})
         .then(result => {
            res.json({msg: "succes"})
         })
         .catch(err => {
            res.status(500).json({msg: "fail"})
         });
    }
    else{
        const productID = req.body.productID;

        DB.updateWishlistById({_id: wishlistID}, {$pull: {items: {id: productID}}})
         .then(result => res.json({msg: "succes"}))
         .catch(err => res.status(500).json({msg: "fail"}));
    }
}

exports.deleteWishlistByID = (req,res) => {
    const wishlistID = req.params.id;
    DB.deleteWishlist(wishlistID)
      .then(result => res.json({msg: "succes"}))
      .catch(err => res.status(500).json({msg: "fail"}))
}