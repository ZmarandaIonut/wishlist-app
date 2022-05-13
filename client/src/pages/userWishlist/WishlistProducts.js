import React from 'react'

export default function WishlistProducts({item, wishlistID, hasEditAcces}) {


  async function removeItemFromWishlist(){
      
   try{

    const sendData = await fetch(`http://localhost:3005/api/userwishlist/${wishlistID}`, {
        method: "PUT",
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify({productID: item.id, action: "remove"}),
    });
    
    const recivedData = await sendData.json();

    if(recivedData.msg === "succes"){
        return window.location.reload();
    }

   }
   catch(err){
       console.log(err);
   }

  }

  async function markItemAsPurchased(){

    const sendData = await fetch(`http://localhost:3005/api/userwishlist/${wishlistID}`, {
        method: "PUT",
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify({productID: item.id, action: "edit"}),
    });

    const recivedData = await sendData.json();
    if(recivedData.msg === "succes"){
       return window.location.reload();
    }
    else if(recivedData.msg === "fail"){
       console.log("Something is wrong with the server...")
    }

  }

  return (
    <div className={`user-wishlist-component${item.purchased && hasEditAcces ? " itemPurcashed" : ""}`}>
       <img style={{borderRadius:"5px"}} alt='product_img' src={item.image} width={100}/>
        <p className='user-wishlist-productTitle'><strong>Title:</strong> {item.title}</p>
        <p className='user-wishlist-productDescription'><strong>Description:</strong> {item.description}</p>
        <div className='user-wishlist-btnContainer'>
         {hasEditAcces ? 
             <>
             <button className='user-wishlist-deleteBtn' onClick={removeItemFromWishlist}>Delete</button>
             {!item.purchased ? 
              <button className='user-wishlist-markAsPurcahse' onClick={markItemAsPurchased}>Mark as purchased</button>
               : <p className='item-own-text'>You bought this product!</p>
             }
             </>
             :null}
        </div>
   </div>
  )
}
