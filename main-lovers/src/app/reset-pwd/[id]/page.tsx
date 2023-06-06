import connectMongo from "../../utils/mongoose";
import user from "../../models/users";
import Link from "next/link";
import mail from "@sendgrid/mail";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export default async function ResetForm(params: any) {
  await connectMongo();
  console.log("RESET PAGE");
  // redirect("/");
  let isEmailValid = true;
  let doPwdMatch = true;

  // console.log("PARAMS 👉 ", params.params.id);

  const token = params.params.id;

  // if (params.id) process.env.RESET_TOKEN = params.id;
  // const resetToken = process.env.RESET_TOKEN;

  if (params.searchParams.valid_email == "false") {
    isEmailValid = false;
  }

  if (params.searchParams.pwds_match == "false") {
    doPwdMatch = false;
    // isEmailValid = false;
  }

  const userCheck = await user.findOne({ resetPwdToken: token });
  console.log(userCheck);

  async function newPwdHandle(data: FormData) {
    "use server";
    const emailInput = data.get("email");
    const passwordInput: any = data.get("password");
    const confirm_password = data.get("confirm_password");

    const emailCheck = await user.findOne({ email: emailInput });

    if (!emailCheck) redirect(`/reset-pwd/${token}?valid_email=false`);

    if (passwordInput !== confirm_password) {
      console.log("passwords don't match");

      redirect(`/reset-pwd/${token}?pwds_match=false`);
      // return;
    }
    const hashedPassword = bcrypt.hashSync(passwordInput, 10);

    const filter = {
      email: emailInput,
      resetPwdToken: token,
    };

    const update = {
      password: hashedPassword,
    };

    const userUpdate = await user.findOneAndUpdate(filter, update, {
      new: true,
    });

    console.log(userUpdate);

    if (userUpdate) {
      console.log("USER FOUND AND UPDATED 🔥");
      // {$unset:{resetPwdToken}}

      // delete token
      const deletedToken = await user.findByIdAndUpdate(userUpdate._id, {
        $unset: { resetPwdToken: "" },
      });
      console.log(deletedToken);
      redirect("/?reset=true");
    } else {
      redirect("/?reset=false");
    }

    //redirection
  }

  return (
    <div>
      {userCheck && (
        <div className=" absolute top-40 w-full">
          {" "}
          <h1 className="text-center">
            {!doPwdMatch
              ? "Passwords don't match! Try again"
              : "Reset your password"}
          </h1>
          <form
            className=" items-center  w-full flex flex-col  justify-center"
            action={newPwdHandle}
          >
            <input
              type="text"
              name="email"
              placeholder={
                !isEmailValid
                  ? "⚠️ Enter a valid email"
                  : "Enter your email here"
              }
              className={
                !isEmailValid
                  ? "input input-bordered input-error w-full max-w-xs"
                  : "input input-bordered input-info w-full max-w-xs"
              }
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password here"
              className={
                !doPwdMatch
                  ? "input input-bordered input-error w-full max-w-xs mt-2"
                  : "input input-bordered input-info w-full max-w-xs mt-2"
              }
              minLength={6}
              required
            />
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm your password here"
              className={
                !doPwdMatch
                  ? "input input-bordered input-error w-full max-w-xs mt-2"
                  : "input input-bordered input-info w-full max-w-xs mt-2"
              }
              minLength={6}
              required
            />
            <button
              className={
                !isEmailValid || !doPwdMatch
                  ? "btn btn-error btn-outline ml-2 mt-2"
                  : "btn btn-info btn-outline ml-2 mt-2"
              }
              type="submit"
            >
              {!isEmailValid ? "TRY AGAIN" : "RESET PASSWORD"}
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
