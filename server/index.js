const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./DB");
const Routes = require("./Routes/RoutesController")
const cors = require("cors");

const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

DB.connect().then(res => {
    if(res === "ok"){
        console.log("conntected to the DB")
        app.listen(PORT, () => console.log(`listening on port ${PORT}`));
    }
})
.catch(err => {
    console.log(err);
    process.exit(1)
});

const authMiddleware = (req, res, next) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, data) => {
      if(err){
          return res.status(401).json({msg: "not allowed"});
      };
        return next();
      })
}

app.post("/api/", authMiddleware, Routes.checkHomePageAcces);

app.post("/api/login", Routes.loginUser);
 
app.post("/api/signin", Routes.signinUser);
 
app.post("/api/getitem", Routes.getItem);

app.get("/api/wishlists/:id", Routes.getWishlistById);

app.post("/api/wishlists", authMiddleware, Routes.createWishlist);

app.get("/api/userwishlist/:id", Routes.getWishlistProducts);

app.post("/api/userwishlist/:id", Routes.verifyWishlistEditAccces);

app.put("/api/userwishlist/:id", Routes.editWishlistByID);

app.delete("/api/userwishlist/:id", Routes.deleteWishlistByID);