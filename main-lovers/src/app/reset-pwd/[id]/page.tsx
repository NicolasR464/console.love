import connectMongo from "../../utils/mongoose";
import user from "../../models/users";
import Link from "next/link";
import mail from "@sendgrid/mail";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export default async function ResetForm({ params }: any) {
  await connectMongo();
  console.log("RESET PAGE");

  const userCheck = await user.findOne({ resetPwdToken: params.id });
  console.log(userCheck);

  async function newPwdHandle(data: FormData) {
    "use server";
    const emailInput = data.get("email");
    const passwordInput: any = data.get("password");
    const confirm_password = data.get("confirm_password");

    if (passwordInput !== confirm_password) {
      console.log("passwords don't match");
      return;
    }
    const hashedPassword = bcrypt.hashSync(passwordInput, 10);

    const filter = {
      email: emailInput,
      resetPwdToken: params.id,
    };

    const update = {
      password: hashedPassword,
    };

    const userUpdate = await user.findOneAndUpdate(filter, update, {
      new: true,
    });

    console.log(userUpdate);

    if (userUpdate) {
      console.log("USER FOUND 🔥");
      // {$unset:{resetPwdToken}}

      // delete token
      const deletedToken = await user.findByIdAndUpdate(userUpdate._id, {
        $unset: { resetPwdToken: "" },
      });
      console.log(deletedToken);
    }
  }

  return (
    <div>
      {userCheck && (
        <div className=" absolute top-40 w-full">
          {" "}
          <h1 className="text-center">Reset your password</h1>
          <form
            className=" items-center  w-full flex flex-col  justify-center"
            action={newPwdHandle}
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email here"
              className="input input-bordered input-info w-full max-w-xs"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password here"
              className="input input-bordered input-info w-full max-w-xs mt-2"
              minLength={6}
              required
            />
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm your password here"
              className="input input-bordered input-info w-full max-w-xs mt-2"
              minLength={6}
              required
            />
            <button
              className="btn btn-info btn-outline ml-2 mt-2"
              type="submit"
            >
              reset password
            </button>
          </form>
        </div>
      )}
      {!userCheck && (
        <div className="translate-y-32 w-full">
          <p className="text-center">something went wrong...</p>
        </div>
      )}
    </div>
  );
}
