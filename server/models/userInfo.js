import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String },
        technologies: { type: [String] },
        repoLink: { type: String },
      },
    ],
    resume: {
      type: String, // Cloudinary URL
      required: false,
    },
    experiences: [
      {
        companyName: { type: String, required: true },
        logo: { type: String },
        role: { type: String, required: true },
        description: { type: String },
        technologies: { type: [String] },
        duration: { type: String }, // Optional for current roles
      },
    ],
    techStacks: {
      type: [String], // Array of technologies
      default: [],
    },
    contactDetails: {
      type: [String], // GitHub, Instagram, LinkedIn, etc.
      default: [],
    },
    codingProfiles: {
      type: [String], // Coding platform profiles
      default: [],
    },
    certifications: {
      type: [String], // URLs of certification files
      default: [],
    },
    achievements: [
      {
        title: { type: String, required: true },
        description: { type: String },
      },
    ],
    about: {
      type: String, // About section text
    },
    profilePhoto: {
      type: String, // Cloudinary URL for the profile photo
    },
    preferredThemeName: {
      type: String, // Name of the theme selected by the user
    },
    generatedPortfolio: {
      type: String, // Path or Cloudinary URL of the generated zip file
    },
    gitCloneUrl: {
      type: String, // URL for cloning the generated GitHub repository
    },
    gitPagesHostedUrl: {
      type: String, // URL where the portfolio is hosted on GitHub Pages
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt timestamps

export const UserInfo = mongoose.model("UserInfo", userInfoSchema);
