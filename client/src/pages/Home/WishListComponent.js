import React from 'react'
import { useNavigate } from 'react-router-dom';
import deleteItemIcon from "./deleteItemIcon.png"

export default function WishListComponent({name, wishlistID}) {

  const navigate = useNavigate();

  function clickHandler(){
    return navigate(`/userwishlist/${wishlistID}`);
  }

  async function deleteWishlist(){
    try{
       const sendData = await fetch(`http://localhost:3005/api/userwishlist/${wishlistID}`, {
         method: "DELETE",
         headers : {'Content-Type': 'application/json'},
       })
       const response = await sendData.json();
       if(response.msg === "succes"){
         return window.location.reload();
       }
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='wishlist-component'>
       <p className='wishlist-component-wNumber'>Wishlist ID #{wishlistID}</p>
       <div className='wishlist-component-wContent'>
         <div className='wishlist-component-name'  onClick={clickHandler}>
          <p className='wishlist-component-wName'>{name}</p>
         </div>
         <div className='remove-wishlist-container' onClick={deleteWishlist}>
           <img alt='remove-icon' src={deleteItemIcon} width={25}/>
         </div>
       </div>
    </div>
  )
}
