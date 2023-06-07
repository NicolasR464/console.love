import React from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RejectUserComponentProps {
    currentUserId: string;
    targetUserId: string;
    roomId: string;
}

function RejectUserComponent({ currentUserId, targetUserId, roomId }: RejectUserComponentProps) {
    const router = useRouter();

    const rejectUserAndDeleteRoom = async () => {
        try {
            const response = await axios.get(`/api/users/${currentUserId}/${targetUserId}/${roomId}`);
            if (response.status === 200) {
                toast.success("User successfully rejected and room deleted!", {
                    position: toast.POSITION.TOP_CENTER,
                });
                router.push('/');  // Redirect to home page
            } else {
                toast.error("There was an error processing the request", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } catch (error) {
            toast.error("There was an error processing the request", {
                position: toast.POSITION.TOP_CENTER,
            });
            console.error(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <button onClick={rejectUserAndDeleteRoom} className="btn bg-pink-lover text-white">UNMATCH </button>
        </>
    );
}

export default RejectUserComponent;
