# AI Resume Builder

AI Resume Builder is a sophisticated web application that leverages artificial intelligence to help users craft professional resumes. The application features an intuitive interface and robust backend services for secure data management.

## 📌 Index  

- [Tech Stack](#tech-stack)  
- [Demo](#demo)  
- [Installation](#installation)  
  - [Setup with Docker](#setup-with-docker)  
  - [Setup without Docker](#setup-without-docker)  
- [Features](#features)  
- [Contribution](#contribution)  
- [Developers](#developers)  

---

## Tech Stack

- **Frontend:** React.js, TailwindCSS, Redux Toolkit  
- **Backend:** Node.js, Express.js, Docker  
- **Database:** MongoDB  

## Demo

🔗 Watch a demonstration on [YouTube](https://youtu.be/IBdpMBvtZhU)  

🌐 Live demo: Add your deployed minor project URL here  

![Thumbnail](./Screenshot/Thumbnil.png)

---
## Installation

To run AI Resume Builder locally, follow these steps:

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd ai-resume-builder
```

### 2️⃣ Create Environment Files  

Before proceeding, create the necessary environment files for **both frontend and backend**.

#### 🔹 Backend (`Backend/.env`)  

Create a `.env` file inside the `Backend/` directory and add the following:  

```plaintext
MONGODB_URI={Your MongoDB URI} # If using Docker: mongodb://mongodb:27017/ai-resume-builder
PORT=5001
JWT_SECRET_KEY={Your Secret Key} #example "secret"
JWT_SECRET_EXPIRES_IN="1d"
NODE_ENV=Dev
ALLOWED_SITE=http://localhost:5173
```

#### 🔹 Frontend (`Frontend/.env.local`)  

Create a `.env.local` file inside the `Frontend/` directory and add the following:  

```plaintext
VITE_GEMENI_API_KEY={Your Gemini API Key}
VITE_APP_URL=http://localhost:5001/
```

### 3️⃣ Choose a Setup Method  

Now, you can **choose** to set up the project **with or without Docker**.

---

### 🚀 Setup with Docker

1. Navigate to the backend directory:
    ```bash
    cd Backend/
    ```

2. Run the Docker Compose file:
    ```bash
    docker-compose up -d
    ```

3. Start the frontend server:
    ```bash
    cd ../Frontend/
    npm install
    npm run dev
    ```

---

## Production Deployment (GitHub Pages + Backend Host)

GitHub Pages can host only the frontend static files. The backend must be deployed separately (for example on Render, Railway, or any VPS).

### 1. Deploy backend from Backend/

Use these environment variables on your backend host:

```plaintext
MONGODB_URI=<your mongo uri>
PORT=5001
JWT_SECRET_KEY=<your jwt secret>
JWT_SECRET_EXPIRES_IN=1d
NODE_ENV=production
ALLOWED_SITE=https://ruchin-audichya.github.io
```

Notes:
- For multiple allowed origins, set ALLOWED_SITE as comma-separated values.
- Health check endpoint: /api/health

### 2. Configure GitHub repository variables/secrets

In GitHub repo settings, add:

- Variable VITE_APP_URL = your deployed backend URL ending with /
    Example: https://your-backend-domain.com/
- Variable VITE_DEMO_AUTH = false
- Optional variable VITE_CLERK_PUBLISHABLE_KEY
- Optional secret VITE_GEMINI_API_KEY

The Pages workflow reads these values during build.

### 3. Re-run GitHub Pages workflow

After setting variables/secrets, run the Deploy Frontend to GitHub Pages workflow again from Actions.

---

### 🔧 Setup without Docker

#### **Frontend Setup**

1. Navigate to the frontend directory and install dependencies:
    ```bash
    cd Frontend/
    npm install
    ```

2. Start the frontend server:
    ```bash
    npm run dev
    ```

#### **Backend Setup**

1. Navigate to the backend directory and install dependencies:
    ```bash
    cd Backend/
    npm install
    ```

2. Start the backend server:
    ```bash
    npm run dev
    ```

---

## Features

### 1. 🔒 Secure User Authentication  
- Custom authentication with **bcrypt** password hashing  
- **JWT-based** session management  

![Sign In](./Screenshot/SignIn.png)  
![Sign Up](./Screenshot/SignUp.png)  

### 2. 🏠 User Dashboard  
- View and manage previous resume versions  

![User Dashboard](./Screenshot/Dashboard.png)  

### 3. 🎨 Customizable Templates  
- Choose from multiple resume templates  

![Template Customization](./Screenshot/ThemeCust.png)  

### 4. 🤖 AI-Powered Suggestions  
- Smart resume content suggestions  

![AI Suggestions](./Screenshot/AI%20Suggestions.png)  

### 5. 🔍 Live Preview  
- See real-time resume updates  

![Live Preview](./Screenshot/Screenshot%202024-07-08%20233753.png)  

### 6. 📄 Export Options  
- Download resumes in **PDF format**  

![Download & Share](./Screenshot/downloadShare.png)  

---

## Contribution

We welcome contributions! To contribute, follow these steps:

### 1. Fork the Repository

Click the **Fork** button on the top right of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/ai-resume-builder.git
cd ai-resume-builder
```

### 3. Create a New Branch

```bash
git checkout -b feature-name
```

Replace `feature-name` with a descriptive name for your changes.

### 4. Make Changes & Test Locally

Modify the code and ensure everything works as expected.

### 5. Commit Your Changes

```bash
git add .
git commit -m "Describe your changes"
```

### 6. Push to Your Fork

```bash
git push origin feature-name
```

### 7. Create a Pull Request (PR)

- Go to your project repository and open the Pull Requests tab.
- Click **"New Pull Request"** and select your branch.
- Add a description and submit your PR.

### 8. Review & Merge  

The maintainers will review your PR. Once approved, it will be merged into the main repository.

---

## Developers 👨‍💻👩‍💻

- Ruchin Auichya
- Palak Kumari
- Shriya Gakkhar

Made by Ruchin Auichya, Palak Kumari, Shriya Gakkhar

---