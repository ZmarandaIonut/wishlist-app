import {React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import PageAuth from "../../PageAuth"
import WishListComponent from './WishListComponent'
import GoHome from '../../Utils/goHome/GoHome'
import LogOut from '../../Utils/Logout/LogOut'
import SearchForWishlist from './SearchForWishlist/SearchForWishlist'
import Loading from '../../Utils/Loading/Loading'

export default function Home() {

  const [hasAcces, setAcces] = useState(false);
  const [userWishlists, setUserWishlists] = useState();
  const [currentWishlists, setCurrentWishlists] = useState();
  const [processing, setProccesing] = useState();

  const navigate = useNavigate();

  useEffect(() => {

    PageAuth("")
      .then(result => {
        if(result === "not allowed"){
            return navigate("/login");
          }
          setProccesing("done");
          return setAcces(true);
      })
      .catch(err => {
         console.log(err);
      })

  }, [navigate])

  useEffect(() => {
     if(hasAcces){
       
         (async () => {
          try{
            const userID = localStorage.getItem("userid");
            const getData = await fetch(`https://wishlist-app-react.herokuapp.com/api/wishlists/${userID}`);
            const result = await getData.json();
            const wishlists = result.payload.reverse()
            setUserWishlists(wishlists);
            setCurrentWishlists(wishlists);
           }
           catch(err){
              setUserWishlists([]);
           }
         })();
     }
  }, [hasAcces]);

  return (
    <div className='home-page'>
      {processing ? hasAcces ? 
      <>
       <nav>
        <GoHome/>
         <LogOut/>
        </nav>
       <div className='home-panel-container'>
         <div className='wishlist-panel-header'>
          <h2>Your wishlists:</h2>
          <SearchForWishlist setCurrentWishlists={setCurrentWishlists} userWishlists={userWishlists}/>
         </div>
         <div className='homePanel-panelComponents'>
           <div className='homePanel-wishlists'>
           {!currentWishlists ? <Loading/> : currentWishlists.length > 0 ? 
           currentWishlists.map(wishlist => {
            return <WishListComponent key={wishlist._id} name={wishlist.wishlistName} wishlistID={wishlist._id}/>
          }) : userWishlists.length === 0 ? <p>You don't have any wishlish for now.</p> : <p>Nothing found</p>}
           </div>
        </div>
         <div className='create-wishlist-btn-container'>
           <button className='create-wishlist' onClick={() => navigate("/createwishlist")}>Create a wishlist</button>
         </div>

       </div> 
      </> : null : <Loading/>}
    </div> 
  )
}
