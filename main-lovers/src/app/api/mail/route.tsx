import mail from "@sendgrid/mail";
mail.setApiKey(process.env.SENDGRID_KEY!);

export async function GET() {
  console.log("MAIL");

  console.log(mail);

  const msg = {
    to: "nicolas.rocagel@gmail.com",
    from: "nicolas.rocagel@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  mail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );

  //   (async () => {
  //     try {
  //       await mail.send(msg);
  //     } catch (error: any) {
  //       console.error(error);

  //       if (error.response) {
  //         console.error(error.response.body);
  //       }
  //     }
  //   })();
}
