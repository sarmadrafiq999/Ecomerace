import contactModel from "../models/contactModel.js";
import nodeMailer from "nodemailer"

const contactUs = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const transporter = nodeMailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.OWNER_EMAIL,
                pass: process.env.OWNER_EMAIL_PASSWORD
            }
        })
        const ownerEmail = {
            from: email,
            to: process.env.OWNER_EMAIL,
            subject: `New contact form is subbmitted from solar energy by ${name}`,
            html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/>${message}</p>
            `
        }
        const userEmail = {
            from: process.env.OWNER_EMAIL,
            to: email,
            subject: "Thank you for contacting us!",
            html: `
            <p>Hi ${name},</p>
            <p>We have received your message:</p>
            <blockquote>${message}</blockquote>
            <p>We'll get back to you shortly.</p>
            <br/>
            <p>Best regards,<br/>Website Team</p>
          `,
        }
        await transporter.sendMail(userEmail)
        await transporter.sendMail(ownerEmail)
            .then(() => console.log("✅ Confirmation email sent to user!"))
            .catch((err) => console.error("❌ Failed to send user email:", err));


        const contactData = { name, email, message };
        const contact = new contactModel(contactData);
        await contact.save();

        res.status(200).json({ success: true, message: "Message added successfully" });
    } catch (error) {
        console.error("Contact add ERR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { contactUs };
