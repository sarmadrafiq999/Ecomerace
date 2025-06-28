// controllers/subscriberController.js
import Subscriber from "../models/subscriberModel.js";
import nodemailer from "nodemailer";

const subscribeUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const alreadySubscribed = await Subscriber.findOne({ email });
        if (alreadySubscribed) {
            return res.status(400).json({ success: false, message: "Email already subscribed" });
        }

        // Save to DB
        const newSub = new Subscriber({ email });
        await newSub.save();

        // Send Confirmation Email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.OWNER_EMAIL,
                pass: process.env.OWNER_EMAIL_PASSWORD,
            },
        });

        const userEmail = {
            from: process.env.OWNER_EMAIL,
            to: email,
            subject: "Thanks for Subscribing to E-Commerace!",
            html: `
        <p>Hello,</p>
        <p>Thank you for subscribing to our site. We're excited to keep you updated with our latest offers and products.</p>
        <p>Stay tuned!</p>
        <br/>
        <p>Best Regards,<br/>our team</p>
      `,
        };

        await transporter.sendMail(userEmail)
            .then(() => console.log("✅ Confirmation email sent"))
            .catch((err) => console.error("❌ Email send error:", err));

        res.status(200).json({ success: true, message: "Subscribed successfully" });
    } catch (error) {
        console.error("Subscription error:", error);
        res.status(500).json({ success: false, message: "Subscription failed", error: error.message });
    }
};

export { subscribeUser };
