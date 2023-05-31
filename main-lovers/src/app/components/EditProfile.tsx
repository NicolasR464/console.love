import Image from 'next/image'

export default function EditProfile() {
  return (
    <>
    <input type="checkbox" id="my-modal-editprofile" className="modal-toggle" />
        <div className="modal">
        <div className="modal-box p-10 bg-black-lover">
            <h3 className="font-bold text-lg text-center mb-4 text-pink-lover">Edit Profile</h3>

            <div className="carousel w-full">
            <form className="flex flex-col mx-auto w-96 mb-5">
                <input type="text" placeholder="Username" className="input input-bordered input-info w-full my-2" />
                <input type="text" placeholder="Password" className="input input-bordered input-info w-full my-2" />
            </form>
            </div>

            <div className="flex justify-evenly modal-action">
                <label htmlFor="my-modal-editprofile" className="btn btn-outline bg-blue-lover">Cancel</label>
                <label htmlFor="my-modal-editprofile" className="btn btn-outline bg-pink-lover mt-0">Confirm</label>
            </div>
        </div>
    </div>
    </>
  )
}
