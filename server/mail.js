import nodemailer from "nodemailer";

import { google } from "googleapis";
import "dotenv";

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });


const sendEmailSelect = async (req, res) => {
  console.log("request");
  console.log(req.params);

  try {
    const application = await Application.findOne({ _id: req.params.id });
    const employer = await Employer.findOne({
      _id: application.employerId.user,
    });

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
      to: application.email,
      subject: "Sending Email using Node.js",
      text: `congratulations ${application.name} you got selected`,
    };

    const result = await transport.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
};

export {  sendEmailSelect };
