import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import WishlistProducts from './WishlistProducts';
import AddNewProduct from './AddNewProduct';
import GoHome from '../../Utils/goHome/GoHome';
import LogOut from '../../Utils/Logout/LogOut';
import shareIcon from "./shareIcon.png"
import ShareWishlistInfo from './shareWishlistInfo/ShareWishlistInfo';
import SearchProduct from './SearchProduct/SearchProduct';
import Loading from "../../Utils/Loading/Loading"
import DisplayMessage from './DisplayMessage';

export default function UserWishlist() {

 const {id} = useParams();

 const [products, setProducts] = useState();
 const [currentProducts, setCurrentProducts] = useState();
 const [displayAddNewProduct, setDispalyNewProduct] = useState(false);
 const [hasEditAcces, setEditAcces] = useState(null); // used to check if the user own this wishlist.
 const [displayShareWishlistInfo, setDisplayShareWishlistInfo] = useState(false);

 useEffect(() => {

  const userID = localStorage.getItem("userid");

    (async () => {
      try{
        const data = await fetch(`http://localhost:3005/api/userwishlist/${id}`, {
          method: "POST",
          headers : {'Content-Type': 'application/json'},
          body: JSON.stringify({clientID: userID})
        });
        const result = await data.json();
        if(result.msg === "allowed"){
          return setEditAcces(true);
        }
        else{
         return setEditAcces(false);
        }
      }
      catch(err){
        console.log(err)
      }
    })();
 }, [id])

 useEffect(() => {
   
    if(typeof hasEditAcces === "boolean"){
      (async () => {
        try{
          const data = await fetch(`http://localhost:3005/api/userwishlist/${id}`);
          const result = await data.json();
          if(result.msg === "fail"){  // handle unexistent wishlist
            setCurrentProducts([]);
            return setProducts([]);
          }
          setProducts(result.items);
          setCurrentProducts(result.items);
        }
        catch(err){
          console.log(err);
        }
      })();
    }

 }, [hasEditAcces, id])

  return (
    <div className='user-wishlist-main'>
        <GoHome/>
        <LogOut/>
       <div className='user-wishlist-panel'>
          {displayAddNewProduct ? <AddNewProduct setDispalyNewProduct={setDispalyNewProduct} id={id} products={products}/> : null}
           {currentProducts ? 
           <>
           <h2>Wishlist ID #{id}</h2>
           <SearchProduct products={products} setCurrentProducts={setCurrentProducts}/>
           {hasEditAcces ? 
             <div className='user-wishlist-shareWishlist' onClick={() => setDisplayShareWishlistInfo(true)}>
               <img width={30} src={shareIcon} alt="shareIcon"/>
             </div> : null
            }

           {
             displayShareWishlistInfo ? <ShareWishlistInfo setDisplayShareWishlistInfo={setDisplayShareWishlistInfo}/> : null
           }
           <div className={`user-wishlist-content${displayAddNewProduct || displayShareWishlistInfo ? " blur-filter" : ""}`}>

              {currentProducts.length > 0 ? currentProducts.map((item,i) => {
                  return <WishlistProducts item={item} key={i} wishlistID = {id} hasEditAcces={hasEditAcces}/>
              }) : products.length === 0 ? <DisplayMessage msg={"This wishlist is empty"}/> : <DisplayMessage msg={"Nothing for that result"}/>}

           </div>
            {hasEditAcces ? 
            <div className='add-product-container-btn'>
                <button
                className='user-wishlist-addProduct-btn'
                onClick={() => setDispalyNewProduct(true)}>
                Add product
               </button>
            </div> : null}
            </> : <Loading/> }
        </div>
    </div>
  )
}
