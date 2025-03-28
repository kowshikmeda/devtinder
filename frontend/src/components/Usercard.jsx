import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../../utils/feedSlice';

const Usercard = ({user}) => {
   const dispatch=useDispatch();

   const handleSendRequest=async(status,userId)=>{
    try{
      console.log("status and id:",status,userId)
      const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},
        {withCredentials:true})
      dispatch(removeUserFromFeed(userId));
    }catch(err){
      console.log(err);
    }
   }
  
    const {firstName,age,lastName,gender,about,photoUrl,_id}=user;
  return  (
    <div><div className="card bg-base-300 w-96 shadow-sm">
    <figure>
      <img
        src={photoUrl}
        alt="user photo" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName+" "+lastName}</h2>
      {age && gender && <p>{age+" , "+gender}</p>}
      <p>{about}</p>
      <div className="card-actions justify-center my-4">
      <button className="btn btn-primary"
      onClick={()=>handleSendRequest("ignored",_id)}
      >Ignored</button>
        <button className="btn btn-secondary"
        onClick={()=>handleSendRequest("interested",_id)}
        >Interested</button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Usercard