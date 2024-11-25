import nodemailer from "nodemailer" ;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, col_name, email, phone, message } = req.body;

    // Email recipient (replace with your email address)
    const recipientEmail = "abhijithpa015@gmail.com";

    // Email subject
    const subject = 'Contact Form Submission: ${name}';

    // Email content
    const emailContent = `
      Name: ${name}
      College Name: ${col_name}
      Email: ${email}
      Phone: ${phone}
      Message:
      ${message}
    `;

    try {
      // Configure Nodemailer transport
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email provider (e.g., Gmail)
        auth: {
          user: "abhijithpa015@gmail.com", // Your email
          pass: "Abhijithpa@1717", // Your email password or app password
        },
      });

      // Send the email
      await transporter.sendMail({
        from: email,
        to: recipientEmail,
        subject: subject,
        text: emailContent,
      });

      res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send email." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
