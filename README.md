

# HackForge AI

**Your AI-Powered Hackathon Partner**

HackForge AI is a full-stack web application that enables users to transform plain English project ideas into fully scaffolded, production-ready codebases. It features real-time collaboration, modern UI/UX design, and seamless integration with AI code generation services.

---

## 🚀 Features

- **Natural Language to Code**:Describe your project idea in plain English and receive a complete codebase
- **Real-Time Collaboration**:Join "idea rooms" to brainstorm and build with others in real-time
- **Modern UI/UX**:Sleek dashboard with dynamic project cards, trending ideas, and showcase sections
- **Authentication**:Custom login and signup pages without third-party components, ensuring compatibility with preview features
- **AI Integration**:Utilizes Groq AI for code generation
- **Export Options**:Download generated code as a `.zip` file or push directly to GitHub
- **Responsive Design**:Fully responsive layout with smooth animations and transitions

---

## 🛠️ Tech Stack

| Layer          | Technology                            |
|----------------|---------------------------------------|
| Frontend        Next.js (App Router), Tailwind CSS, shadcn/ui, Framer Motin |
| Backend         Node.js with Express or FastAI               |
| Database        MongoDB or PostgreSL                        |
| Real-Time       Socket.IO or Aby                           |
| Authentication  Custom implementation (no Clerk component) |
| AI Integration  Groq I                                    |

---

## 📁 Project Structure

``

hackforge-ai/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   └── ...
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
├── .env
├── package.json
└── READMEmd
```


---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14 or highr)- npm or yrn- MongoDB or PostgreSQL instace

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/hackforge-ai.git
   cd hackforgeai
   ```


2. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   GROQ_API_KEY=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
   DATABASE_URL=your_database_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:300
   ```


3. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn instll
   ```


4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn ev
   ```


   The application will be available at `http://localhost:3000`.

---

## 🧪 Testig

To run tests, use the following commnd:

```bsh
npm run test
# or
yarn est
```


---

## 📦 Deploymnt

To deploy the application, consider using platforms like Vercel, Heroku, or Netlify. Ensure that all environment variables are correctly set in the deployment environent.

---

## 🤝 Contribuing

Contributions are welcome! Please follow these teps:

1. **Fork the repository**.
2. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```


3. **Commit your changes**:

   ```bash
   git commit -m "Add your message here"
   ```


4. **Push to the branch**:

   ```bash
   git push origin feature/your-feature-name
   ```


5. **Open a pull request**.

---

## 📄 Liense

This project is licensed under the [MIT License](LIENSE).

---

## 📧 Cntact

For any inquiries or feedback, please contact [tharunraman10@gmail.com](mailto:tharunraman10@gmail.com).
