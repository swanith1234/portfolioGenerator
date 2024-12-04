Portfolio Generator

Portfolio Generator is a cutting-edge MERN stack application designed to simplify the creation of personalized, responsive, and professional portfolios. With an intuitive UI and dynamic capabilities, users can create, customize, host, and share their portfolios effortlessly.


---

Features

🎨 Theme Selection

Choose from a range of eye-catching portfolio themes.

Themes built using modern frameworks like Three.js, Framer Motion, and Tailwind CSS for interactive and visually stunning designs.


📝 Personalized Input

Fill out forms to input personal details, professional experiences, projects, and more.

Real-time preview of portfolio content as it's created.


🗂️ Dynamic Folder Generation

Leveraging Node.js file systems, the application dynamically creates and organizes portfolio folders for efficient structure.


🚀 Automated GitHub Integration

Automatically creates a GitHub repository using GitHub tokens.

Pushes portfolio files directly to the repository without manual intervention.


🌐 Live Hosting

Utilizes Vercel tokens to dynamically deploy portfolios to Vercel.

Provides users with a live-hosted link to their portfolio instantly.


📧 Email Notifications

Sends users an email containing:

The hosted portfolio link.

The GitHub repository URL.


Ensures users can easily share and access their portfolios.



---

Tech Stack

Frontend: React.js, Tailwind CSS, Framer Motion, Three.js

Backend: Node.js, Express.js

Database: MongoDB

Deployment & Automation:

GitHub API (via GitHub tokens)

Vercel API (via Vercel tokens)


Email Notifications: Nodemailer



---

How It Works

1. Select a Theme:
Users choose from several visually appealing themes built using advanced frameworks.


2. Fill the Details:
A simple form lets users add all the necessary information for their portfolio.


3. Generate Portfolio:

Dynamically generates portfolio files using Node.js.

Ensures folder structure is clean and organized.



4. Push to GitHub:

Automatically creates and pushes the portfolio to a GitHub repository.

Allows users to own and manage their portfolios with ease.



5. Host on Vercel:

Deploys the portfolio dynamically to Vercel for live access.



6. Email Notification:

Sends the live-hosted link and GitHub repository URL to the user’s email for easy sharing.





---

Getting Started

1. Clone the Repository:

git clone https://github.com/your-username/portfolio-generator.git  
cd portfolio-generator


2. Install Dependencies:

npm install


3. Run the Application:

Development mode:

npm run dev

Production build:

npm run build  
npm run preview



4. Setup Tokens:

Add your GitHub and Vercel tokens in the .env file.

Configure your SMTP credentials for Nodemailer.





---

Contributions

Contributions are welcome! Please feel free to fork the repository, submit issues, or create pull requests.


---

License

This project is licensed under the MIT License.


---

Start creating portfolios effortlessly and leave a lasting impression with Portfolio Generator!
