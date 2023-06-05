import connectMongo from "../utils/mongoose";
import user from "../models/users";
import Link from "next/link";
import mail from "@sendgrid/mail";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
// import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { log } from "console";

export default async function ResetPwd() {
  await connectMongo();
  // const { pending } = useFormStatus();
  // let message = "nothing";

  async function checkEmail(data: FormData) {
    "use server";
    const emailInput = data.get("email");

    if (emailInput == "") return;

    const userCheck = await user.findOne({ email: emailInput });

    let isSent = false;

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

      // const postRes = await axios.post(
      //   `${process.env.HOSTNAME}/api/mail`,

      //   { body: sendBody },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log({ postRes });

      try {
        const postRes = await axios.post(
          `/api/mail`,
          {
            body: sendBody,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("↴✉️");

        console.log(postRes.data);
        isSent = true;

        // if (postRes)
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("no user found by that email");
    }

    redirect(`/reset-pwd/sent?sent=${isSent}`);
    // console.log(userCheck);
  }

  return (
    <div className="translate-y-32">
      <Link className="ml-2 btn" href="/">
        Go Back
      </Link>

      <h1 className="text-center">Let&#39;s reset your password</h1>
      <form
        className="translate-y-10 w-full flex direction-col justify-center"
        action={checkEmail}
      >
        <input
          type="text"
          name="email"
          placeholder="Enter your email here"
          className="input input-bordered input-info w-full max-w-xs"
          // disabled={pending}
          // formAction={changeUI}
        />
        <button className="btn btn-info btn-outline ml-2" type="submit">
          SEND
        </button>
      </form>
    </div>
  );
}
