import Image from "next/image";
import Login from "./LoginModal";
import SignUp from "./SignUpModal";

export default function HomeScreen() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("https://cdn.shopify.com/s/files/1/0295/8036/1827/articles/BLOG_1_fabc8a00-f5a9-41c4-903f-69a7cc2bdeb9.jpg?v=1602242282")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Console.love()</h1>
          <p className="mb-5">Suis le var_dump de ton coeur...</p>
          <div className="flex justify-center">
            <label
              htmlFor="my-modal-signup"
              className="btn btn-outline bg-blue-lover w-28 mr-5"
            >
              Sign Up
            </label>
            <label
              htmlFor="my-modal-login"
              className="btn btn-outline bg-pink-lover w-28 ml-5"
            >
              Login
            </label>
          </div>
        </div>
      </div>
      <Login />
      <SignUp />
    </div>
  );
}
