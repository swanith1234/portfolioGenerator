import fs from "fs-extra";
import path from "path";
import { exec, execSync } from "child_process";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Helper function to execute shell commands
function runCommand(command, cwd) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        return reject(error);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

export const generatePortfolio = async (templatePath, outputPath, userData) => {
  console.log("Generating portfolio at:", outputPath);
  try {
    // Step 1: Copy the template to the output path
    await fs.copy(templatePath, outputPath);

    console.log("Installing dependencies...");
    execSync("npm install", { cwd: outputPath, stdio: "inherit" });

    console.log("Installing Tailwind CSS and dependencies...");
    execSync("npm install tailwindcss postcss autoprefixer", {
      cwd: outputPath,
      stdio: "inherit",
    });
    execSync("npx tailwindcss init", { cwd: outputPath, stdio: "inherit" });

    const cssFilePath = path.join(outputPath, "src", "index.css");
    const cssContent = `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `;
    await fs.writeFile(cssFilePath, cssContent, "utf-8");

    console.log("Configuring user data and processing files...");
    const processFiles = async (dirPath) => {
      const files = await fs.readdir(dirPath);
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) {
          await processFiles(filePath);
        } else if (path.extname(file) === ".ejs") {
          let content = await fs.readFile(filePath, "utf-8");
          content = content
            .replace(/{name}/g, userData.name || "Default Name")
            .replace(/{about}/g, userData.about || "Default About Text")
            .replace(/{experience}/g, userData.experience || "Default Experience")
            .replace(/{skills}/g, userData.skills || "Default Skills");
          const newFilePath = filePath.replace(/\.ejs$/, ".jsx");
          await fs.writeFile(newFilePath, content, "utf-8");
          await fs.unlink(filePath);
        }
      }
    };

    await processFiles(outputPath);

    const appFilePath = path.join(outputPath, "src", "App.jsx");
    let appContent = await fs.readFile(appFilePath, "utf-8");
    appContent = appContent
      .replace(`const App = () => {`, `const App = ({ userData }) => {`)
      .replace(/<([A-Za-z]+)\s?\/?>/g, `<$1 userData={userData} />`);
    await fs.writeFile(appFilePath, appContent, "utf-8");

    const mainFilePath = path.join(outputPath, "src", "main.jsx");
    let mainContent = await fs.readFile(mainFilePath, "utf-8");
    mainContent = mainContent.replace(
      `<App />`,
      `<App userData={${JSON.stringify(userData)}} />`
    );
    await fs.writeFile(mainFilePath, mainContent, "utf-8");

    console.log("Portfolio generated successfully!");
  } catch (err) {
    console.error("Error generating portfolio:", err.message);
  }
};

export const runGeneratedPortfolio = async (
  outputPath,
  port = 5000,
  devMode = false
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (devMode) {
        const devProcess = exec("npm run dev", { cwd: outputPath });
        devProcess.stdout.on("data", (data) => console.log(data));
        devProcess.stderr.on("data", (data) => console.error(data));
        setTimeout(() => resolve(`http://localhost:${port}`), 3000);
      } else {
        console.log("Building the project...");
        execSync("npm run build", { cwd: outputPath, stdio: "inherit" });

        console.log("Starting preview server...");
        const previewProcess = exec(
          `npx vite preview --port ${port}`,
          { cwd: outputPath },
          (error) => {
            if (error) return reject(error);
          }
        );
        previewProcess.stdout.on("data", (data) => console.log(data));
        previewProcess.stderr.on("data", (data) => console.error(data));
        setTimeout(() => resolve(`http://localhost:${port}`), 3000);
      }
    } catch (err) {
      console.error("Error running portfolio:", err.message);
      reject(err);
    }
  });
};

async function createGitHubRepo({ repoName, accessToken, description = "", isPrivate = false }) {
  try {
    const response = await axios.post(
      "https://api.github.com/user/repos",
      { name: repoName, description, private: isPrivate },
      { headers: { Authorization: `token ${accessToken}` } }
    );
    console.log("Repository created successfully:", response.data.html_url);
    return response.data.clone_url;
  } catch (error) {
    console.error("Error creating repository:", error.response?.data?.message);
    throw error;
  }
}

function pushToGitHub({ repoUrl, projectPath, branch = "main" }) {
  try {
    if (!fs.existsSync(`${projectPath}/.git`)) {
      execSync("git init", { cwd: projectPath });
    }

    execSync(`git remote add origin ${repoUrl}`, { cwd: projectPath });
    execSync("git add .", { cwd: projectPath });
    execSync('git commit -m "Initial commit"', { cwd: projectPath });
    execSync(`git branch -M ${branch}`, { cwd: projectPath });
    execSync(`git push -u origin ${branch}`, { cwd: projectPath });

    console.log("Code pushed successfully!");
  } catch (error) {
    console.error("Error pushing to GitHub:", error.message);
  }
}

async function deployToVercel({ projectPath, accessToken }) {
  try {
    const deployCommand = `vercel deploy --token ${accessToken} --prod --yes`;
    const output = await runCommand(deployCommand, projectPath);
    const deployedUrlMatch = output.match(/https:\/\/.*\.vercel\.app/);
    if (!deployedUrlMatch) {
      throw new Error("Deployment failed: No deployment URL found.");
    }
    console.log("Deployment successful:", deployedUrlMatch[0]);
    return deployedUrlMatch[0];
  } catch (error) {
    console.error("Error deploying to Vercel:", error.message);
    throw error;
  }
}

export async function deployPortfolio(projectPath, userName) {
  const repoName = userName;
  const accessToken = process.env.GIT_ACCESS_TOKEN;

  try {
    const repoUrl = await createGitHubRepo({
      repoName,
      accessToken,
      description: "Portfolio website",
      isPrivate: false,
    });

    pushToGitHub({ repoUrl, projectPath });

    const deployedUrl = await deployToVercel({
      projectPath,
      accessToken: process.env.VERCEL_ACCESS_TOKEN,
    });

    console.log("Portfolio successfully deployed:", deployedUrl);
    return { repoUrl, deployedUrl };
  } catch (error) {
    console.error("Deployment failed:", error.message);
  }
}


async function deleteGeneratedFolder(outputPath) {
  const maxRetries = 3;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      console.log(`Waiting for processes to release folder: ${outputPath}`);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay

      console.log(`Attempting to delete folder: ${outputPath}`);
      await fs.remove(outputPath);
      console.log("Generated folder deleted successfully!");
      break;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, error.message);
      if (attempts >= maxRetries) {
        console.error(
          "Maximum retry attempts reached. Could not delete folder."
        );
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second retry delay
    }
  }
}
