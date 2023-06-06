import mail from "@sendgrid/mail";
import { log } from "console";
import { NextResponse, NextRequest } from "next/server";

mail.setApiKey(process.env.SENDGRID_KEY!);

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: "GET EMAIL API" });
}

export async function POST(req: Request, res: NextResponse) {
  // resetPwdToken

  console.log("POST EMAIL 💥");

  const parsed = await req.json();
  console.log("✉️ DOWN ↴");

  console.log(parsed.body.email);

  const msg = {
    to: parsed.body.email,
    from: process.env.NICO_EMAIL!,
    // bcc: "nicolas.rocagel@epitech.eu",
    subject: "Password reset",
    text: "click on <a>this link</a>  to reset your password",
    html: `click on 👉 <a href=${process.env.HOSTNAME}/reset-pwd/${parsed.body.hash}> this link to reset your password</a>`,
  };
  console.log("email sending");

  mail.send(msg).then(
    () => {
      console.log("email sent! 🚀");
      return NextResponse.json({ data: "POST EMAIL", status: 200 });
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
        return NextResponse.json({ data: "Email couldn't go through...." });
      }
    }
  );

  // return NextResponse.json({ data: "POST EMAIL API" });
}
