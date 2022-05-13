import React,{useState, useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom"
import user from "./img/user.png"
import unlock from "./img/unlock.png"
import emailImg from "./img/email.png"

function Register() {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPass, setConfirmPass] = useState("");
   const [error, setError] = useState("");

   const [requestOptions, setRequestOptions] = useState(null); // used to send post request.

   const navigate = useNavigate();

   const validateInput = () => {
     const valUsername = username.match(/[a-z|A-Z]{3,10}/g);
     const emailVal = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/g);
     const passVal = password.length > 5;
     if(!valUsername){
       setError("Invalid username format!");
       return false;
     }
     else if(!emailVal){
       setError("Please provide a valid email!");
       return false;
     }
     else if(!passVal){
       setError("Your password is to short!");
       return false;
     }
     else if(password !== confirmPass){
       setError("Passwords do not match!");
       return false;
     }
     return valUsername && emailVal && passVal;
   }
   function applyData(e){
    e.preventDefault();
    if(validateInput()){
      const bodyData = {
        username,
        email,
        password,
      }
      setRequestOptions({
       method: "POST",
       headers : {'Content-Type': 'application/json'},
       body: JSON.stringify(bodyData),
      })
     }
   }
   
   useEffect(() => {
      if(requestOptions){
        fetch("http://localhost:3005/api/signin", requestOptions)
        .then(res => {
          if(!res.ok){
              res.json().then(err => {
                return setError(err.msg);
              })
          }
          else{
            res.json().then(acc => {
              localStorage.setItem("token", acc.token);
              localStorage.setItem("userid", acc.userid);
              return navigate("/");
            });
          }
      })
      .catch(err =>{
        setError("Server Error! Please try again later.");
      })
      }
   }, [requestOptions, navigate])

  return (
    <form className='register_page' onSubmit={applyData}>
        <div className='register_container'>
          <h2 className='cl_gray'>Register</h2>
          <div className='register_inputs'>

            <div className='register_inputs_cnt'>
               <img height="20" src={user} alt="user"/>
               <input className='register_input_field' placeholder='Username' onChange={(e) => setUsername(e.target.value)} autoFocus={true}/>
            </div>
           
            <div className='register_inputs_cnt'>
               <img height="20" src={emailImg} alt="user"/>
               <input className='register_input_field' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className='register_inputs_cnt'>
               <img height="20" src={unlock} alt="user"/>
               <input className='register_input_field' placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)}/>
            </div> 

           <div className='register_inputs_cnt'>
               <img height="20" src={unlock} alt="user"/>
               <input className='register_input_field' placeholder='Confirm password' type="password" onChange={(e) => setConfirmPass(e.target.value)}/>
            </div>

          </div>

          <footer>
            {error ? <p className='error'>{error}</p> : null}
            <button className='register_button' type='submit'>Register</button>
            <div className='existing-account'>
               <p>Already have an account?</p>
               <Link to="/login">Login now!</Link>
             </div>
          </footer>

        </div>
    </form>
  )
}

export default Register