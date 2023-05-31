import Image from 'next/image'

export default function UserPictures() {
  return (
    <>
    <h2 className="text-center text-3xl font-bold my-10">MY PICTURES</h2>
        <div className="hero-content flex-wrap lg:flex-row">

            <div>
                <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
            </div>

            <div>
                <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
            </div>

            <div>
                <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
            </div>

            <div>
                <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
            </div>

            <div>
                <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
            </div>
            
        </div>
    </>
  )
}
