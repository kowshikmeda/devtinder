
import axios from 'axios'
import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';
import Usercard from './Usercard';

const Editprofile = ({user}) => {
    const [firstName,setFirstName]=useState(user.firstName);
    const [lastName,setLastName]=useState(user.lastName);
    const [age,setAge]=useState(user.age);
    const [gender,setGender]=useState(user.gender);
    const [photoUrl,setPhotoUrl]=useState(user.photoUrl);
    const [about,setAbout]=useState(user.about);
    const [error,setError]=useState("");
    const [showToast,setShowToast]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
     const saveProfile=async()=>{
      try{
        setError("");
        const res=await axios.patch(BASE_URL+"/profile/edit",{
         firstName,lastName,age,gender,photoUrl,about
        },{withCredentials:true})
       // console.log(res);
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
       // navigate("/");
      }catch(e){
        setError(e.response.data);
        // console.log(e);
      }
      
      }
    return (
        <>
        <div className='flex justify-center  my-14'>
      <div className='flex justify-center  mx-4'> 
      <div className="card bg-base-300 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title ">Edit Profile</h2>
          <div className='m-3'>
          <fieldset className="fieldset">
           <legend className="fieldset-legend">FirstName</legend>
                <input type="text" className="input"  value={firstName} 
                onChange={(e)=>setFirstName(e.target.value)}/>    
           </fieldset>
           <fieldset className="fieldset">
           <legend className="fieldset-legend">LastName</legend>
                <input type="text" className="input" 
                value={lastName} onChange={(e)=>setLastName(e.target.value)}/>    
           </fieldset>

           <fieldset className="fieldset">
           <legend className="fieldset-legend">PhotoUrl</legend>
                <input type="text" className="input" 
                value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)}/>    
           </fieldset>

           <fieldset className="fieldset">
           <legend className="fieldset-legend">Age</legend>
                <input type="text" className="input"
                value={age} onChange={(e)=>setAge(e.target.value)}/>    
           </fieldset>

           <fieldset className="fieldset">
           <legend className="fieldset-legend">Gender</legend>
                <input type="text" className="input" 
                value={gender} onChange={(e)=>setGender(e.target.value)}/>    
           </fieldset>

           <fieldset className="fieldset">
           <legend className="fieldset-legend">About</legend>
                <input type="text" className="input" 
                value={about} onChange={(e)=>setAbout(e.target.value)}/>    
           </fieldset>
            
        
          </div>
          <p className='text-red-500'>{error}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" 
          onClick={saveProfile}>Save profile</button>
        </div>
      </div>
    </div>
    </div>
     <Usercard user={{firstName,lastName,photoUrl,age,gender,about}}/>
    </div>
    {showToast &&<div className="toast toast-top toast-center my-18">
  <div className="alert alert-success">
    <span>Profile save  successfully.</span>
  </div>
</div>}
    </>
    )  
}

export default Editprofile