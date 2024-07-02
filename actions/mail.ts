"use server";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
const domain = "http://localhost:3000";
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;
  const msg = {
    to: email,
    from: "amir@gamearound.com", // Use the email address or domain you verified above
    subject: "Verify Your Email Please | Next Auth v5",
    html: `<h1>Verify Your Email<h1/><br/><p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  };
  sgMail.send(msg).then(
    () => {},
    (error: any) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
export const sendResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-password?token=${token}`;
  const msg = {
    to: email,
    from: "amir@gamearound.com", // Use the email address or domain you verified above
    subject: "Reset Password Email | Next Auth v5",
    html: `<h1>Reset Your Passowrd<h1/><br/><p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`,
  };
  sgMail.send(msg).then(
    () => {},
    (error: any) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
