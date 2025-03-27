import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../../utils/requestSlice';
import axios from 'axios';
const Requests = () => {
    const dispatch=useDispatch();
    const requests=useSelector((store)=>store.requests)
   

    const reviewRequests=async(status,_id)=>{
        try{
           
            const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},
                {withCredentials:true})

            dispatch(removeRequest(_id));

        }catch(err){
            console.log(err)
        }

    }

    const fetchRequests=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/requests/received",
                {withCredentials:true}
            )
           // console.log(res);
            dispatch(addRequests(res.data.data))
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchRequests();
    },[])
    if(!requests) return;
    if(requests.length===0) return  <h1 className='font-bold text-2xl flex justify-center'>No requests found</h1>
    return (
      <div className=' text-center my-10 '>
        <h1 className='font-bold text-2xl'> Connection Requests</h1>
        {requests.map((request)=>{
          const {firstName,lastName,age,gender,photoUrl,about,_id}=request.fromUserId;
         return (
         <div  key={_id} className='m-4 rounded-lg bg-base-300 p-4 flex items-center justify-between w-1/2 mx-auto'>
          <div> <img src={photoUrl} className='w-20 h-20 rounded-full' alt='photo'/></div>
          <div className='text-left mx-4'> 
            <h2 className='font-bold text-xl'> {firstName+" "+lastName}</h2> 
            {age && gender && <p>{age +", "+gender}</p>}
          <p>{about}</p>
          
          </div>
         
            <div >
                <button className='btn btn-primary mx-2' 
                onClick={()=>reviewRequests("rejected",request._id)}>
                    Rejected</button>
                <button className='btn btn-secondary mx-2'
                 onClick={()=>reviewRequests("accepted",request._id)}
                >Accepted
                </button>
                </div>
           
            </div>)
  })}
        </div>
    )
}

export default Requests