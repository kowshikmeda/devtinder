import React from 'react'

const Usercard = ({user}) => {
    //console.log("user feed:",user);
    const {firstName,age,lastName,gender,about,photoUrl}=user;
  return (
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
      <button className="btn btn-primary">Ignored</button>
        <button className="btn btn-secondary">Interested</button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Usercard