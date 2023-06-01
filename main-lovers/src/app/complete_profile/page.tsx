import React from 'react'
import ProfileCompletion from '../components/Complete_profile';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from 'axios';
import { redirect } from 'next/navigation';


export default async function CompleteProfile() {

  const session = await getServerSession(authOptions);
  const email = session?.user.email;
  const response = await axios.get(`http://localhost:3000/api/users?query=${email}`);
  const user = response.data.data?._id.toString();



  if (!session || !session.user || !session.user.email) {
      console.log('coucou')
      redirect('/');
    } else {
      const email = session.user.email;
      const response = await axios.get(`http://localhost:3000/api/users?query=${email}`);
      const user = response.data.data?._id;
  
      if (user) {
        const resFirstime = await axios.get(`http://localhost:3000/api/users/${user}`);
        const userFirstime = resFirstime.data.data.address; 
        if (userFirstime)
        redirect('/myprofile')       
    }


  }
  return (
    <>       
      <ProfileCompletion userID={user} />
    </>
  )
}

