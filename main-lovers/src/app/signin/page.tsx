export default async function signin() {
  return (
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
    </div>
  );
}
