import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env === "production", // true for port 465, false for other ports
        auth: {
            user: "rahadmosharof@gmail.com",
            pass: "xtdv lcfx nyyu fapq",
        },
    });

    await transporter.sendMail({
        from: 'rahadmosharof@gmail.com', // sender address
        to, // list of receivers
        subject: "Reset your password", // Subject line
        text: "Reset your password with in 10 min!", // plain text body
        html, // html body
    });
}