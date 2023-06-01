"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import ModalEdit from '../components/Complete_profile';

export default function EditProfile({ userID }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };



  return (
    <>
      <label htmlFor="my-modal-editprofile" className="btn btn-outline bg-blue-lover w-28 mr-5" onClick={handleModalToggle}>
        Edit
      </label>
      {modalVisible && 
        <div id={`my-modal-${userID}`}>
          
          <ModalEdit userID={userID} onClose={handleModalToggle}/>
        </div>
      }
    </>
  );
}
