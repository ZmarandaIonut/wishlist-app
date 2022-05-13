import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import PageAuth from "../../PageAuth"
import GoHome from '../../Utils/goHome/GoHome';
import LogOut from '../../Utils/Logout/LogOut';
import AddProducts from './AddProducts';
 

export default function CreateWishList() {
    
    const [webURL, setwebURL] = useState('');
    const [items, setItems] = useState([]);
    const [wishlistName, setWishlistName] = useState("");
    const [validateWishlistName, setWishlistNameError] = useState("");
    const [hasAcces, setAcces] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        PageAuth("wishlists").then(result => {
           if(result === "not allowed"){
             return navigate("/");
           }
           else{
             return setAcces(true);
           }
        })
        .catch(err => console.log(err))
    }, [navigate]);
    
   async function saveWishlist(){
     const user = localStorage.getItem("userid");
     const token = localStorage.getItem("token");
     if(!wishlistName){
       return setWishlistNameError("Please add a name to your wishlist.")
     }

     try{
      const data = await fetch("http://localhost:3005/api/wishlists", {
        method: "POST",
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: items, wishlistname: wishlistName, owner: user, token})
      })
      const result = await data.json();
      if(result.msg === "succes"){
         return navigate("/");
      }
     }
     catch(err){
        console.log(err);
     }
  }

  return (
    <div className='create-wishlist-page'>
       {hasAcces? 
       <>
       <GoHome/>
       <LogOut/>
       <div className='wishlist-page-container'>
          <h1>Create a wishlist</h1>
          <div className='wishlist-center-panel'>
              <div className='wishlist-center-panel-firstCol'>
                  <div className='wishlist-setup-name'>
                      <p>Wishlist name:</p>
                      <input autoFocus={true} onChange={(e) => setWishlistName(e.target.value)}/>  
                      {validateWishlistName ? <p className='error'>{validateWishlistName}</p> : null}    
                  </div>
                  <AddProducts setItems={setItems} setwebURL={setwebURL} webURL={webURL} items={items}/>
              </div>
              <div className='wishlist-center-panel-secCol'>
                  <div className='wishlist-view-products'>       
                    <div className='wishlist-added-products-panel'>
                    <h2>Products</h2>
                    {
                       items.length === 0 ? 
                         <p>Your added items will appear right here.</p>
                         :
                         items.map((item,i) => {
                            return <Product key={i} title={item.title} imgsrc={item.image}/>
                         })
                     }
                    </div>
                  </div>
              </div>
          </div>
            <div className='create-wishlist-bottom-container'>
              <p className='user-wishlist-websites-supp' style={{marginTop: 0}}>Websites supported: <a rel='noopener noreferrer' target="_blank" href='https://emag.ro'>Emag</a> and <a rel='noopener noreferrer' target="_blank" href='https://eu.perixx.com/'>euPerixx</a></p>
             <div className='create-wishlist-btnContainer'>
               <button className='create-wishlist-btn' onClick={saveWishlist}>Save this wishlist</button>
             </div>
            </div>


       </div>
       </> : null}
    </div>
  )
}
