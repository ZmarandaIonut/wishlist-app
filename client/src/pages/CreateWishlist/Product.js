import React from 'react'

export default function Product({title, imgsrc}) {
  return (
    <div className='wishlist-added-product'>
         <img width={80} height={80} src={imgsrc} alt="imgsrc" style={{borderRadius: "5px"}}/>
         <div className='wishlist-added-product-content'>
           <p><strong>Title:</strong> {title.length > 60 ? title.slice(0,60)+"[...]" : title}</p>
         </div>
    </div>
  )
}
