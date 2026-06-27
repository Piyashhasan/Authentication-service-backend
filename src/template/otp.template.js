export const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f7fb; padding:40px 20px;">
        <tr>
            <td align="center">

                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                        <td align="center" style="background:#2563eb; padding:32px;">
                            <h1 style="margin:0; color:#ffffff; font-size:28px;">
                                Email Verification
                            </h1>
                            <p style="margin:10px 0 0; color:#dbeafe; font-size:15px;">
                                Verify your email address to continue
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px 35px; color:#374151;">

                            <p style="margin:0 0 16px; font-size:16px;">
                                Hello,
                            </p>

                            <p style="margin:0 0 24px; font-size:16px; line-height:1.7;">
                                We received a request to verify your email address.
                                Please use the following One-Time Password (OTP):
                            </p>

                            <!-- OTP -->
                            <div style="text-align:center; margin:35px 0;">
                                <span style="
                                    display:inline-block;
                                    background:#eff6ff;
                                    border:2px dashed #2563eb;
                                    color:#2563eb;
                                    padding:18px 40px;
                                    font-size:34px;
                                    font-weight:bold;
                                    letter-spacing:10px;
                                    border-radius:10px;
                                ">
                                    ${otp}
                                </span>
                            </div>

                            <p style="margin:0 0 20px; font-size:15px; line-height:1.7;">
                                This verification code is valid for
                                <strong>5 minutes</strong>.
                            </p>

                            <div style="
                                background:#fef3c7;
                                border-left:4px solid #f59e0b;
                                padding:15px;
                                border-radius:6px;
                                font-size:14px;
                                color:#92400e;
                                line-height:1.6;
                            ">
                                <strong>Security Tip:</strong><br>
                                Never share this OTP with anyone. Our team will never ask you for your verification code.
                            </div>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:24px 35px; background:#f9fafb; border-top:1px solid #e5e7eb;">

                            <p style="margin:0; font-size:14px; color:#6b7280; line-height:1.7;">
                                If you didn't request this verification, you can safely ignore this email.
                                No further action is required.
                            </p>

                            <hr style="margin:24px 0; border:none; border-top:1px solid #e5e7eb;">

                            <p style="margin:0; text-align:center; color:#9ca3af; font-size:13px;">
                                © ${new Date().getFullYear()} Loop. All rights reserved.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
`;
