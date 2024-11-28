import express from "express";
import http from "http";

import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./databases/dbConnection.js";
import userRouter from "./routers/userInfo.js";
import { generatePortfolio } from "./controllers/portfolioGeneratorController.js";
import { runGeneratedPortfolio } from "./controllers/portfolioGeneratorController.js"; // Import the function to run the portfolio

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Routes
dbConnection();

// Example userData to pass to the portfolio generator
const userData = {
  name: "John Doe",
  emailId: "john.doe@example.com",
  phoneNo: "1234567890",
  projects: [
    {
      title: "Portfolio Website",
      description: "A personal portfolio showcasing skills and projects.",
      technologiesUsed: ["HTML", "CSS", "JavaScript"],
      repoOrSiteLink: "https://github.com/johndoe/portfolio",
    },
    {
      title: "E-commerce Application",
      description: "An online store for electronics.",
      technologiesUsed: ["React", "Node.js", "MongoDB"],
      repoOrSiteLink: "https://github.com/johndoe/ecommerce-app",
    },
  ],
  resume: "https://cloudinary.com/some-resume-link",
  experiences: [
    {
      companyName: "Tech Innovators",
      role: "Frontend Developer",
      description: "Built interactive and responsive UIs.",
      technologiesUsed: ["React", "Redux"],
      duration: "1 year",
    },
    {
      companyName: "Next Gen Software",
      role: "Backend Developer",
      description: "Developed REST APIs for various client projects.",
      technologiesUsed: ["Node.js", "Express", "MongoDB"],
      duration: "6months",
    },
  ],
  contactDetailsUrls: [
    "https://github.com/johndoe",
    "https://linkedin.com/in/johndoe",
    "https://instagram.com/johndoe",
  ],
  codingProfilesUrls: [
    "https://leetcode.com/johndoe",
    "https://codeforces.com/profile/johndoe",
  ],
  certificationsUrls: [
    "https://certifications.com/cert1",
    "https://certifications.com/cert2",
  ],
  achievements: [
    {
      title: "Hackathon Winner",
      description: "Won first place in the Annual Tech Hackathon 2023.",
    },
    {
      title: "Employee of the Year",
      description: "Awarded for outstanding contributions to the company.",
    },
  ],
  techStacks: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Redux",
  ],
  about:
    "A passionate software developer skilled in MERN stack and problem-solving.",

  preferredThemeName: "Dark Mode",
};

// Generate the portfolio

// Start the main server
app.use("/api/v1/", userRouter);

app.listen(port, () => {
  console.log(`Main server is running on port ${port}`);
});

export default app;
