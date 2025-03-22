import React, { useState } from 'react'
import axios from 'axios'
const Login = () => {
  const [emailId,setEmailId]=useState("");
  const [password,setPassword]=useState("");

   const handleLogin=async()=>{
    try{
      const res=await axios.get("http://localhost:3000/login",{
        emailId,password
      },{withCredentials:true})
      console.log(res);
    }catch(e){
      console.log(e);
    }
    
    }
  return (
    <div className='flex justify-center my-10'> 
    <div className="card bg-base-300 w-96 shadow-sm">
    <div className="card-body">
      <h2 className="card-title justify-center">Login</h2>
        <div className='m-3'>
        <fieldset className="fieldset">
         <legend className="fieldset-legend">Email id</legend>
              <input type="text" className="input" placeholder="Email Address" value={emailId} 
              onChange={(e)=>setEmailId(e.target.value)}/>    
         </fieldset>
         <fieldset className="fieldset">
         <legend className="fieldset-legend">Password</legend>
              <input type="password" className="input" placeholder="************" 
              value={password} onChange={(e)=>setPassword(e.target.value)}/>    
         </fieldset>
          

        </div>
      <div className="card-actions justify-center">
        <button className="btn btn-primary" 
        onClick={handleLogin}>Login</button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Login