import React from 'react'

export default function ShareWishlistInfo({setDisplayShareWishlistInfo}) {
  const URL = window.location.href;

  function clickButtonHandler(){
    navigator.clipboard.writeText(URL)
    setDisplayShareWishlistInfo(false);
  }
  return (
    <div className='user-wishlist-share'>
       <p className='user-wishlist-share-closeTab' onClick={() => setDisplayShareWishlistInfo(false)}>✖</p>
       <p>You can share your wishlist with other people just by copying the bellow URL</p>
       <p>{URL}</p>
       <p><strong>Note:</strong> Don't worry, nobody can edit your wishlist :)</p>
       <button onClick={clickButtonHandler}>Copy URL</button>
    </div>
  )
}
