import nodemailer from "nodemailer";
import { UserInfo } from "./models/UserInfo.js";
import { google } from "googleapis";
import "dotenv";

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendEmailSelect = async (email, name, url) => {
  try {
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "swanithpidugu@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: oAuth2Client.getAccessToken(),
      },
    });

    let mailOptions = {
      from: "swanithpidugu@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      text: `congratulations ${name} you portfolo is successfully deployed at ${url}`,
    };

    const result = await transport.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { sendEmailSelect };
