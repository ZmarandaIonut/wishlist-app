import React from 'react'
import { useNavigate } from 'react-router-dom'
import homeImg from "./Home_img.png"

export default function GoHome() {

  const navigate = useNavigate();

 function navToHome(){
     return navigate("/");
 }
  return (
    <div className='goHome' onClick={navToHome}>
        <img width={55} alt="goHomeImg" src={homeImg}/>
    </div>
  )
}
