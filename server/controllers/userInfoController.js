import { UserInfo } from "../models/userInfo.js";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  deployPortfolio,
  generatePortfolio,
  runGeneratedPortfolio,
} from "../controllers/portfolioGeneratorController.js"; // Import the function to run the portfolio
import { sendEmailSelect } from "../mail.js";

// Manually define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createUserInfo = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      name,
      emailId,
      phoneNo,
      projects,
      resume,
      experiences,
      techStacks,
      contactDetails,
      codingProfiles,
      certifications,
      achievements,
      about,
      profilePhoto,
      preferredThemeName,
    } = req.body;

    console.log("Request Body:", req.body);
    console.log("Projects Selected", projects);
    // Create a new instance of the UserInfo model
    const newUser = new UserInfo({
      name,
      emailId,
      phoneNo,
      techStacks,
      projects,
      resume,
      experiences,
      contactDetails,
      codingProfiles,
      certifications,
      achievements,
      about,
      profilePhoto,
      preferredThemeName,
    });

    // Save the new user portfolio in the database
    const savedUser = await newUser.save();

    const templatePath = path.join(__dirname, "../threejs-portfolio-main");
    const outputPath = path.join(__dirname, `../${name.split(" ")[0]}`);

    // Generate and deploy the portfolio
    await generatePortfolio(templatePath, outputPath, savedUser);

    // Run the generated portfolio and retrieve the URL
    const runURL = await runGeneratedPortfolio(templatePath, outputPath, 4000);
    console.log("local server", runURL);
    // Deploy the portfolio
    const { repoUrl, deployedUrl } = await deployPortfolio(
      outputPath,
      name.split(" ")[0]
    );

    console.log(`Generated portfolio is accessible at: ${deployedUrl}`);
    await sendEmailSelect(emailId, name, deployedUrl, repoUrl);
    // Send a success response with the generated URL
    res.status(201).json({
      success: true,
      message: "User portfolio created successfully!",
      data: savedUser,
      portfolioURL: deployedUrl,
    });
  } catch (error) {
    console.error("Error saving user portfolio:", error);

    // Send an error response
    res.status(500).json({
      success: false,
      message: "Failed to create user portfolio.",
      error: error.message,
    });
  }
};
