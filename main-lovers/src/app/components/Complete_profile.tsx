import Image from "next/image";

export default function SignUpModal() {
  return (
    <>
      <input type="checkbox" id="my-modal-signup" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box p-10 bg-black-lover">
          <h3 className="font-bold text-lg text-center mb-4 text-pink-lover">
            Welcome to console.love dear friend !
          </h3>

          <div className="carousel w-full h-72">
            <div id="slide1" className="carousel-item relative w-full mx-2">
              <form className="flex flex-col mx-auto w-96">
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered input-info w-full my-2"
                />
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered input-info w-full my-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered input-info w-full my-2"
                />
              </form>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 mt-60">
                <a href="#slide1" className="btn btn-circle bg-blue-lover">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle bg-blue-lover">
                  ❯
                </a>
              </div>
            </div>

            <div id="slide2" className="carousel-item relative w-full mx-2">
              <form className="flex flex-col mx-auto w-96">
                <input
                  type="text"
                  placeholder="Age"
                  className="input input-bordered input-info w-full my-2"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered input-info w-full my-2"
                />
                <input
                  type="text"
                  placeholder="Password"
                  className="input input-bordered input-info w-full my-2"
                />
              </form>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 mt-60">
                <a href="#slide1" className="btn btn-circle bg-blue-lover">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle bg-blue-lover">
                  ❯
                </a>
              </div>
            </div>

            <div id="slide3" className="carousel-item relative w-full mx-2">
              <form className="flex flex-col mx-auto w-96">
                <input
                  type="text"
                  placeholder="Sex"
                  className="input input-bordered input-info w-full my-2"
                />
                <input
                  type="text"
                  placeholder="Attraction"
                  className="input input-bordered input-info w-full my-2"
                />
                <input
                  type="text"
                  placeholder="Dev pref. languages"
                  className="input input-bordered input-info w-full my-2"
                />
              </form>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 mt-60">
                <a href="#slide2" className="btn btn-circle bg-blue-lover">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle bg-blue-lover">
                  ❯
                </a>
              </div>
            </div>

            <div id="slide4" className="carousel-item relative w-full mx-2">
              <form className="flex flex-col mx-auto w-96">
                <input
                  type="text"
                  placeholder="Merge/Const"
                  className="input input-bordered input-info w-full my-2"
                />
                <p>Choose a profile picture :</p>
                <input
                  type="file"
                  placeholder="Profile picture"
                  className="input input-bordered input-info w-full my-2"
                />
              </form>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 mt-60">
                <a href="#slide3" className="btn btn-circle bg-blue-lover">
                  ❮
                </a>
                <a href="#slide5" className="btn btn-circle bg-blue-lover">
                  ❯
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-evenly modal-action">
            <label
              htmlFor="my-modal-signup"
              className="btn btn-outline bg-blue-lover"
            >
              Cancel
            </label>
            <label
              htmlFor="my-modal-signup"
              className="btn btn-outline bg-pink-lover"
            >
              Confirm
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
