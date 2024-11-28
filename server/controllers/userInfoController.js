import { UserInfo } from "../models/userInfo.js";

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  deployPortfolio,
  generatePortfolio,
} from "../controllers/portfolioGeneratorController.js";
import { runGeneratedPortfolio } from "../controllers/portfolioGeneratorController.js"; // Import the function to run the portfolio
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
      contactDetailsUrls,
      codingProfilesUrls,
      certificationsUrls,
      achievements,
      about,
      profilePhoto,
      preferredThemeName,
    } = req.body;
    console.log("reqq", req.body);
    // Create a new instance of the UserInfo model
    const newUser = new UserInfo({
      name,
      emailId,
      phoneNo,
      projects,
      resume,
      experiences,
      contactDetailsUrls,
      codingProfilesUrls,
      certificationsUrls,
      achievements,
      about,
      profilePhoto,
      preferredThemeName,
    });

    // Save the new user portfolio in the database
    const savedUser = await newUser.save();

    const templatePath = path.join(__dirname, "../threejs-portfolio-main");
    const outputPath = path.join(__dirname, "../generated-portfolio");
    let portfolioURL;
    (async () => {
      try {
        // Generate the portfolio
        await generatePortfolio(templatePath, outputPath, savedUser);
        await deployPortfolio(outputPath, name.split(" ")[0]);
        // Run the generated portfolio locally
        portfolioURL = await runGeneratedPortfolio(
          templatePath,
          outputPath,
          4000
        ); // Serve on port 4000
        console.log(`Generated portfolio is accessible at: ${portfolioURL}`);
      } catch (error) {
        console.error("Error generating and running portfolio:", error);
      }
    })();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "User portfolio created successfully!",
      data: savedUser,
      portfolioURL: portfolioURL,
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
