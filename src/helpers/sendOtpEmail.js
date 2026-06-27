import { config } from "../config.js";
import transporter from "../services/nodemailer.js";
import { otpEmailTemplate } from "../template/otp.template.js";

export const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: `"Loop Auth" <${config.EMAIL}>`,
        to: email,
        subject: "Sign Up Verification Code",
        html: otpEmailTemplate(otp),
    };

    await transporter.sendMail(mailOptions);
};
