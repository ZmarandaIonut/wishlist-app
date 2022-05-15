import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Link} from "react-router-dom"
import emailIMG from "../Register/img/email.png"
import unlock from "../Register/img/unlock.png"

export default function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMSG, setError] = useState("");

  const navigate = useNavigate();

  function loginUser(){

    setError("");
    fetch("https://wishlist-app-react.herokuapp.com/api/login",{
       method: "POST",
       headers : {'Content-Type': 'application/json'},
       body: JSON.stringify({email, password}),
      }) 
      .then(response => {
        response.json()
           .then(res => {
             if(res.msg === "not match"){
               return setError("Email or password not match!");
             }
             if(res.msg === "match"){
                 localStorage.setItem("token", res.token);
                 localStorage.setItem("userid", res.id);
                 return navigate("/");
             }
           })
           .catch(err => setError("Server error!"));
      })
      .catch(err => setError("Please try again later."));
  }
  
  return (
    <div className='login_page'>
      <div className='login_container'>
        <div className='login_header'>
          <h2 className='cl_gray'>Login</h2>
        </div>

        <div className='login_inputs_cnt'>
         <img height="20" src={emailIMG} alt="img"/>
         <input className='login_inputs' placeholder='Email adress' autoFocus={true} onChange={e => setEmail(e.target.value)}/>
        </div>

        <div className='login_inputs_cnt'>
        <img height="20" src={unlock} alt="img"/>
        <input className='login_inputs' placeholder='Password' type="password" onChange={e => setPassword(e.target.value)}/>
        </div>
         {errorMSG ? <p className='error'>{errorMSG}</p> : null}
        <div className='login_panel_anno'>
          <p className='cl_gray'>Don't have an account?</p>
          <Link to="/register" className='sign_in'>Sign up now!</Link>
        </div>
        <button className='login_lg_btn' onClick={loginUser}>Login</button>
      </div>
    </div>
  )
}
