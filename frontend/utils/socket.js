import {io} from 'socket.io-client'
import { BASE_URL } from './constants'

export const createSocketConnection=()=>{
    if(import.meta.env.MODE!=="production"){
        return io(BASE_URL)
    }else{
        return io("/",{path:"https://devtinder-oelc.onrender.com/socket.io"})
    }
    

}