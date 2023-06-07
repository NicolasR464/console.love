import React from "react";
import { useState, useEffect } from "react"


export default function UserRowAdmin({user}: any) { 
  const [isDeleted, setIsDeleted] = useState(false)
  
  const handleDelete = async (userId : string ) => {
     // Code pour effectuer l'action de suppression
     

  
        // DELETE request using fetch with async/await
            await fetch('/api/users/' +userId , { method: 'DELETE' });
            alert('User delete successfully');
            setIsDeleted(true)

            //Mettre un toaster
            
                     
  }
 
  if(isDeleted) {
    return (<></>)
  }
  return (
     <tr>
      
       <td>{user.profileStatus ? user.profileStatus : "no data" }</td>
       <td>{user.name ? user.name : "no data" }</td>
       <td>{user.firstName ? user.firstName : "no data" }</td>
       <td>{user.lastName ? user.lastName : "no data" }</td>
       <td>{user.age ? user.age : "no data" }</td>
       <td>{user.email ? user.email : "no data" }</td>

       <td>{user.city ? user.city : "no data" } </td>
<td>{user.premium ? 'Yes' : (user.premium === false ? 'No' : 'no data')}</td>
<td>
  {user.languages.length !== 0 ? (
    user.languages.map((language: any, index: any) => (
      <div key={index}>{language}:</div>
    ))
  ) : (
    "no data"
  )}
</td>

      <td>{user.sex ? user.sex : "no data" }</td>
      <td>
  {user.attraction.length > 0 ? (
    user.attraction.map ((attraction:string, index: any) => (
    <div key={index}>{attraction}</div>
    ))
  ) : (
    "no data"
  )}
</td>


       <td>{user.admin ? 'Yes' : 'No'}</td>{/*condition affichage admin id yes/no*/}
      <td>

        
         <button className="btn btn-active btn-xs">Edit</button>
       </td>
       <td>
       <button className="btn btn-error" onClick={() => handleDelete(user._id)}>
  Delete
</button>


      </td>
     </tr>
  );
 }
