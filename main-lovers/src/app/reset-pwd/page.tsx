import connectMongo from "../utils/mongoose";
import user from "../models/users";
import Link from "next/link";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
// import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default async function ResetPwd(params: any) {
  await connectMongo();
  // const { pending } = useFormStatus();

  console.log(params.searchParams.valid_email);

  let isEmailValid = true;

  if (params.searchParams.valid_email == "false") {
    isEmailValid = false;
  }
  async function checkEmail(data: FormData) {
    "use server";
    const emailInput = data.get("email");

    if (emailInput == "") return;

    const userCheck = await user.findOne({ email: emailInput });

    if (userCheck) {
      console.log("USER FOUND");
      const uuid = uuidv4();

      const filter = { email: emailInput };
      const update = { resetPwdToken: uuid };

      const userUpdate = await user.findOneAndUpdate(filter, update, {
        new: true,
      });

      console.log(userUpdate);

      const sendBody = {
        hash: uuid,
        email: emailInput,
      };

      try {
        const postRes = await axios.post(
          `${process.env.HOSTNAME}/api/mail`,
          {
            body: sendBody,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(postRes.data);

        // if (postRes)
      } catch (err) {
        console.log(err);
      }
      redirect(`/reset-pwd/sent`);
    } else {
      redirect(`/reset-pwd?valid_email=false`);
      // console.log("no user found by that email");
    }

    // console.log(userCheck);
  }

  return (
    <div className="translate-y-32">
      <Link className="ml-2 btn" href="/">
        Go Back
      </Link>

      <h1 className="text-center">
        {!isEmailValid
          ? "Please enter a REGISTERED email"
          : "Let's reset your password"}
      </h1>
      <form
        className="translate-y-10 w-full flex direction-col justify-center"
        action={checkEmail}
      >
        <input
          type="text"
          name="email"
          placeholder={"Enter your email here"}
          className={
            !isEmailValid
              ? "input input-bordered input-error w-full max-w-xs"
              : "input input-bordered input-info w-full max-w-xs"
          }
        />
        <button
          className={
            !isEmailValid
              ? "btn btn-error btn-outline ml-2"
              : "btn btn-info btn-outline ml-2"
          }
          type="submit"
        >
          {!isEmailValid ? "TRY AGAIN" : "SEND"}
        </button>
      </form>
    </div>
  );
}
