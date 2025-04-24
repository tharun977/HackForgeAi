

# ⚒️ HackForge AI

**Your AI-Powered Hackathon Partner**

HackForge AI is a full-stack web application that enables users to transform plain English project ideas into fully scaffolded, production-ready codebases. It features real-time collaboration, modern UI/UX design, and seamless integration with AI code generation services.

---

## 🚀 Features

- **Natural Language to Code**: Describe your project idea in plain English and receive a complete codebase.
- **Real-Time Collaboration**: Join "idea rooms" to brainstorm and build with others in real-time.
- **Modern UI/UX**: Sleek dashboard with dynamic project cards, trending ideas, and showcase sections.
- **Authentication**: Custom login and signup pages without third-party components, ensuring compatibility with preview features.
- **AI Integration**: Utilizes Groq AI for code generation.
- **Export Options**: Download generated code as a `.zip` file or push directly to GitHub.
- **Responsive Design**: Fully responsive layout with smooth animations and transitions.

---

## 🛠️ Tech Stack

| Layer          | Technology                                      |
|----------------|-------------------------------------------------|
| Frontend       | Next.js (App Router), Tailwind CSS, shadcn/ui, Framer Motion |
| Backend        | Node.js with Express or Fastify                 |
| Database       | MongoDB or PostgreSQL                           |
| Real-Time      | Socket.IO or Ably                               |
| Authentication | Custom implementation (no Clerk components)    |
| AI Integration | Groq AI                                         |

---

## 📁 Project Structure

```
hackforge-ai/
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
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB or PostgreSQL instance

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/hackforge-ai.git
   cd hackforge-ai
   ```

2. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   GROQ_API_KEY=your_groq_api_key
   DATABASE_URL=your_database_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

---

## 🧪 Testing

To run tests, use the following command:

```bash
npm run test
# or
yarn test
```

---

## 📦 Deployment

To deploy the application, consider using platforms like Vercel, Heroku, or Netlify. Make sure all environment variables are properly set in the deployment environment.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes**:

   ```bash
   git commit -m "Add your message here"
   ```

4. **Push to the branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a pull request**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

For any inquiries or feedback, please contact [tharunraman10@gmail.com](mailto:tharunraman10@gmail.com).

