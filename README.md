# 🔐 NextAuth Prisma Mongo Authentication Template

A simple authentication template using **NextAuth.js**, **Prisma**, and **MongoDB**, with support for **Google, GitHub, and Magic Link (Email) authentication**.  

---

## 📖 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Installation](#️-installation)
- [🔑 Getting API Credentials](#-getting-api-credentials)
  - [📌 Google OAuth Setup](#-google-oauth-setup)
  - [📌 GitHub OAuth Setup](#-github-oauth-setup)
  - [📌 Magic Link Auth Setup](#-magic-link-auth-setup)
- [🚀 Running the Project](#-running-the-project)
- [🛠️ Built With](#-built-with)
- [📜 License](#-license)
- [⭐ Show Some Love!](#-show-some-love)

---

## 🚀 Features

- ✅ NextAuth.js with multiple authentication providers  
- ✅ Google OAuth, GitHub OAuth, and Resend email authentication  
- ✅ Prisma ORM with MongoDB  
- ✅ Secure session handling with JWT  
- ✅ Fully customizable authentication logic  

---

## 🛠️ Installation

### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/subhadeeproy3902/nextauth-prisma-mongo-template.git
cd nextauth-prisma-mongo-template
 ```plaintext

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Setup Environment Variables

Create a .env.local file in the root directory and add the following:

```ini
# Follow the README.md for more information on how to get the environment credentials

AUTH_SECRET= #Run `npx auth secret` in your terminal
AUTH_TRUST_HOST=
DATABASE_URL=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_RESEND_KEY=
GITHUB_ID=
GITHUB_SECRET=
```

## 🔑 Getting API Credentials

### 📌 Google OAuth Setup

Follow these steps to get **Google Client ID** and **Secret**:  

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).  
2. Create a new project or select an existing one.  
3. Navigate to **API & Services** → **Library**, enable **Google Identity Platform**.  
4. Go to **API & Services** → **Credentials**, click **Create Credentials** → **OAuth Client ID**.  
5. Set application type as **Web Application** and enter the following redirect URL:  
`http://localhost:3000/api/auth/callback/google`
6. Get the **Client ID** and **Secret**, and add them to `.env.local`:

```ini
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Example 1

![alt text](<google-cloud.png>)

### 📌 GitHub OAuth Setup

Follow these steps to get **GitHub Client ID** and **Secret**:  

1. Go to [GitHub Developer Settings](https://github.com/settings/developers).  
2. Click **New OAuth App**, then set the following details:  
   - **Application Name**: Your project name  
   - **Homepage URL**: `http://localhost:3000` (or your production URL)  
   - **Authorization Callback URL**:
   `http://localhost:3000/api/auth/callback`

3. Click **Register Application**.  
4. Once registered, you will get a **Client ID**.  
5. Click **Generate a new client secret** and copy it.  
6. Add these credentials to your `.env.local` file:  

```ini
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

#### Example 2

![alt text](<github.png>)

### 📌 Magic Link Auth Setup

1. Go to [Resend API key](https://resend.com/api-keys)
2. Create your api key
3. Add these credentials to your `.env.local` file:  
  
```ini
  AUTH_RESEND_KEY==your-resend-api-key
```

4. Goto `src > lib > auth.ts` and change the following accordingly if you have a Resend domain, like [mvp-subha.me](mvp-subha.me)

```ts
Resend({
  apiKey: process.env.AUTH_RESEND_KEY!, 
  // from: 'Acme <onboarding@resend.dev>',  // If you are using Resend and do not have a domain
  from: "your-project-name <brand@your-domain>", // For personal domains
  sendVerificationRequest, // For customised emails
}),
```

## 🚀 Running the Project

### 1️⃣ Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be live at `http://localhost:3000`.

## 🛠️ Built With  

- **Next.js** – React framework for server-side rendering  
- **TypeScript** - Strongly typed programming language that builds on JavaScript
- **NextAuth.js** – Authentication for Next.js applications  
- **Prisma** – ORM for database management  
- **MongoDB** – NoSQL database for scalable storage  
- **Resend** – Email authentication provider  
- **TailwindCSS** – Utility-first CSS framework for styling  

## 📜 License

This project is licensed under the [MIT License](LICENSE) – feel free to use and modify it as needed.  

## ⭐ Show Some Love  

If you found this project helpful, consider giving it a **star ⭐ on GitHub**!  

## Owner

The primary contact for inquiries about the project is [Subhadeep Roy](git.new/Subha). Feel free to reach out for any questions, suggestions, or issues related to the project. My [Linkedin](https://www.linkedin.com/in/subhadeep3902/).

---

💙 **Happy Coding!** 🚀
