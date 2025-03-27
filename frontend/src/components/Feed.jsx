import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../../utils/feedSlice';
import Usercard from './Usercard';

const Feed = () => {
  const dispatch=useDispatch();
  const feed=useSelector((store)=>store?.feed?.data);
  const getFeed=async(e)=>{
    try{
      if(feed)return;
      const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
      dispatch(addFeed(res.data))
      //console.log(res);
    }  catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getFeed();

  },[])
  return  feed && (
    <div className='flex justify-center my-10'><Usercard user={feed[0]}/></div>
  )
}

export default Feed
