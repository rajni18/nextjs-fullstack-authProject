const nodemailer = require("nodemailer");
import User from "@/models/userModel"
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    console.log("sendemail---",email,userId,typeof(emailType))

    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        const verifyEmailHTML = `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to verify your email
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</p>`;

        const resetEmailHTML = `<p>Click <a href="${process.env.DOMAIN}/resetemail?token=${hashedToken}">here</a> to reset your password
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetemail?token=${hashedToken}</p>`;

      console.log("emailType--",emailType)


        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })

        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

         var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "48a80cfeaa4bd7",
              pass: "0e2e8eccdf023e"
              //TODO: add these credentials to .env file
            }
          });

        const mailOption = {
            from: 'rajni1801284@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY" ? verifyEmailHTML : resetEmailHTML
        }
        const mailresponse = await transport.sendMail
            (mailOption);
            
        return mailresponse;


    } catch (error: any) {
        throw new Error(error.message);
    }

}