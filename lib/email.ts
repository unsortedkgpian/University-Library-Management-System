import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

interface EmailParams {
    email: string;
    subject: string;
    message: string;
}

// Email service configuration
const emailConfig = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || "theadityakumar2810@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "muem ymkp ekqm vgbs",
    },
};

// Create transporter instance
const transporter = nodemailer.createTransport(emailConfig);

export async function sendEmail({
    email,
    subject,
    message,
}: EmailParams): Promise<void> {
    try {
        const emailContent: Mail.Options = {
            from: `"Your App Name" <${emailConfig.auth.user}>`,
            to: email,
            subject: subject,
            text: message, // Plain text version
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2c3e50;">${subject}</h2>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 0;">${message}</p>
                    </div>
                    <p>
                        Best regards,<br>
                        Your App Team
                    </p>
                </div>
            `,
        };

        const info = await transporter.sendMail(emailContent);
        console.log("Email sent successfully:", info.messageId);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
}

// Verify transporter connection
transporter.verify(function (error, success) {
    if (error) {
        console.error("Email service verification failed:", error);
    } else {
        console.log("Email service is ready to send messages");
    }
});
