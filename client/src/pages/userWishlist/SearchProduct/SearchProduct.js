import React,{useState,useEffect} from 'react'
import SearchIcon from "../../Home/SearchForWishlist/searchIcon.png"

export default function SearchProduct({products, setCurrentProducts}) {

const [searchValue, setSearchValue] = useState('');
const [isSearchActive, setSearchActive] = useState(false); 
 useEffect(() => {
   if(products){
     try{
      const exprs = new RegExp("\\b" + searchValue, "gi");
      const filterData = products.filter(items => items.title.match(exprs) || items.description.match(exprs));
      setCurrentProducts(filterData);
     }
     catch(err){
       setCurrentProducts([]);
     }
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [searchValue])
  return (
    <div className='serach-for-wishlist-container'>
     <img width={45} src={SearchIcon} alt='searchIcon' onClick={() => {
       setSearchValue('');
       setSearchActive(!isSearchActive)
     }}/>
     {isSearchActive ?  <input autoFocus={true} placeholder='Title| description' onChange={(e) =>  setSearchValue(e.target.value)}/> : null}
    </div>
  )
  
}
