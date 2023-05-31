import Image from 'next/image'
import NavBar from '../components/NavBar';
import EditProfile from '../components/EditProfile';
import UserPictures from '../components/UserPictures';

export default function MyProfile() {
    
  return (
        <main className="flex max-h-screen flex-col items-center justify-between absolute w-p70 right-12 mt-10">
            <div className="flex-col mt-10">
                <div className="hero rounded-3xl">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                            <h1 className="text-4xl font-bold text-pink-lover">My Profile</h1>

                            <div className="flex">
                                <div className="flex-col w-96 mr-4">
                                    <input type="text" placeholder="Username" className="input input-bordered input-info w-full my-2" />
                                    <input type="text" placeholder="First Name" className="input input-bordered input-info w-full my-2" />
                                </div>
                                <div className="flex-col">
                                    <input type="text" placeholder="Email" className="input input-bordered input-info w-full my-2" />
                                    <input type="text" placeholder="Last Name" className="input input-bordered input-info w-full my-2" />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-col w-96 mr-4">
                                    <input type="text" placeholder="Password" className="input input-bordered input-info w-full my-2" />
                                    <input type="text" placeholder="Adress" className="input input-bordered input-info w-full my-2" />
                                </div>
                                <div className="flex-col">
                                    <input type="text" placeholder="Confirm Password" className="input input-bordered input-info w-full my-2" />
                                    <input type="text" placeholder="City" className="input input-bordered input-info w-full my-2" />
                                </div>
                            </div>
                            
                            <label htmlFor="my-modal-editprofile" className="btn btn-outline bg-blue-lover w-28 mr-5">Edit</label>

                            <EditProfile />
                        </div>
                    </div>
                </div>
                <UserPictures />
            </div>
        </main>
  )
}
