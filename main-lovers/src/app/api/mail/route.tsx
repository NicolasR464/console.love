import mail from "@sendgrid/mail";
import { NextResponse, NextRequest } from "next/server";

mail.setApiKey(process.env.SENDGRID_KEY!);

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: "GET EMAIL API" });
}

export async function POST(req: Request, res: NextResponse) {
  // resetPwdToken

  console.log("POST EMAIL 💥");

  const parsed = await req.json();

  console.log(parsed);

  const msg = {
    to: parsed.body.email,
    from: process.env.NICO_EMAIL!,
    subject: "Password reset",
    text: "click on <a>this link</a>  to reset your password",
    html: `click on 👉 <a href=http://localhost:3000/reset-pwd/${parsed.body.hash}> this link to reset your password</a>`,
  };

  mail.send(msg).then(
    () => {
      console.log("email sent! 🚀");
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );

  return NextResponse.json({ data: "POST EMAIL API" });
}
