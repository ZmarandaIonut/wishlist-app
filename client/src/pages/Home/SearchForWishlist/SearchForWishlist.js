import React,{useState,useEffect} from 'react'
import SearchIcon from "./searchIcon.png"

export default function SearchForWishlist({setCurrentWishlists,userWishlists}) {

  const [searchValue, setSearchValue] = useState('');
  const [isSearchActive, setSearchActive] = useState(false); 

  useEffect(() => {
    if(userWishlists){
      try{
        const exprs = new RegExp("\\b" + searchValue, "gi");
        const filterData = userWishlists.filter(items => items.wishlistName.match(exprs));
        setCurrentWishlists(filterData);
      }
      catch(err){
        setCurrentWishlists([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])  

  return (
    <div className='serach-for-wishlist-container'>
        <img width={45} src={SearchIcon} alt="searchIcon" onClick={() =>{
           setSearchValue("");
           setSearchActive(!isSearchActive);
        }}/>
       {isSearchActive ?  <input autoFocus={true} placeholder='Enter the wishlist name' onChange={(e) =>  setSearchValue(e.target.value)}/> : null}
    </div>
  )
}
