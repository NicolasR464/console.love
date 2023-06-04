import connectMongo from "../utils/mongoose";
import user from "../models/users";
import Link from "next/link";
import mail from "@sendgrid/mail";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export default async function ResetPwd() {
  await connectMongo();

  async function checkEmail(data: FormData) {
    "use server";
    const emailInput = data.get("email");

    const userCheck = await user.findOne({ email: emailInput });

    if (userCheck) {
      console.log("USER FOUND");
      const uuid = uuidv4();
      //   const hashedUuid = bcrypt.hashSync(uuid, 10);

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
        const postRes = await axios.post("http://localhost:3000/api/mail", {
          body: sendBody,
        });
        console.log(postRes.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("no user found by that email");
    }

    // console.log(userCheck);
  }

  return (
    <div className="translate-y-32">
      <Link className="ml-2 btn" href="/">
        Go Back
      </Link>
      <h1 className="text-center">Reset your password</h1>
      <form
        className="translate-y-10 w-full flex direction-col justify-center"
        action={checkEmail}
      >
        <input
          type="text"
          name="email"
          placeholder="Enter your email here"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <button className="btn btn-info btn-outline ml-2" type="submit">
          reset password
        </button>
      </form>
    </div>
  );
}
