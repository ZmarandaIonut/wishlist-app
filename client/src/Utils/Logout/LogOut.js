import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import dc from "./dc.png"
import notLogged from "./not_logged.png"

export default function LogOut() {
  
 const [isLogged, setIsLogged] = useState(false);
 const navigate = useNavigate();

  function logOutUser(){
      if(isLogged){
        localStorage.clear();
        return window.location.reload();
      }
      else{
          return navigate("/login");
      }
  }

  useEffect(() => {
      (() => {
          localStorage.getItem("token") ? setIsLogged(true) : setIsLogged(false);
      })();
  }, []);

  return (
    <div className='logout' onClick={logOutUser}>
       <img width={55} alt='logout-img' src={isLogged ? dc : notLogged}/>
    </div>
  )
}
