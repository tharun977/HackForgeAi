
# HackForgeAi

HackForgeAi is a Next.js-based web application designed to provide AI-based solutions. The application leverages various modern technologies, such as Radix UI, Prisma, and Clerk for authentication, to deliver a rich user experience with AI-driven features.

This project aims to integrate machine learning models and advanced data processing techniques into a user-friendly platform.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Development Server](#running-the-development-server)
5. [Building for Production](#building-for-production)
6. [Folder Structure](#folder-structure)
7. [Tech Stack](#tech-stack)
8. [Features](#features)
9. [Contributing](#contributing)
10. [License](#license)

---

## Getting Started

To get started with HackForgeAi locally on your machine, follow the instructions below to set up the environment, install dependencies, and run the application.

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **pnpm** (v10.9.0 or higher)
- **Next.js** (v13.5.7 or higher)

If you don’t have pnpm installed, you can install it globally with the following command:

```bash
npm install -g pnpm
```

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tharun977/HackForgeAi.git
   cd HackForgeAi
   ```

2. **Install the dependencies:**

   The project uses `pnpm` as the package manager. To install the necessary packages, run:

   ```bash
   pnpm install
   ```

3. **Configure environment variables:**

   Set up your environment variables for development. Create a `.env.local` file in the root of the project with the following structure:

   ```env
   NEXT_PUBLIC_API_URL=<your-api-url>
   DATABASE_URL=<your-database-url>
   CLERK_FRONTEND_API=<your-clerk-frontend-api>
   CLERK_API_KEY=<your-clerk-api-key>
   ```

   You may need to configure additional environment variables depending on your project needs.

---

## Running the Development Server

After installing dependencies and configuring environment variables, you can start the development server.

```bash
pnpm dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Building for Production

To build the project for production, run:

```bash
pnpm build
```

This will generate an optimized production build that can be deployed to a platform like Vercel.

To run the production build locally, use the following command:

```bash
pnpm start
```

---

## Folder Structure

The project follows the typical Next.js folder structure:

```
/pages
  /api         - Contains API routes for server-side logic
  /auth        - Contains authentication-related pages
  index.js     - Main entry point of the app
/components
  - Reusable components such as UI elements
/lib
  - Contains utility functions and configuration files
/styles
  - Global styles (using Tailwind CSS)
  - Component-specific styles
```

---

## Tech Stack

- **Next.js (v13.5.7)** - React-based framework for building server-side rendered (SSR) applications.
- **Prisma (v5.22.0)** - ORM for interacting with databases in a type-safe manner.
- **Clerk (v6.17.0)** - Authentication solution for user management.
- **Radix UI** - Provides a set of low-level UI components for accessibility and customizability.
- **Tailwind CSS (v3.3.3)** - A utility-first CSS framework for building custom designs.
- **TypeScript (v5.2.2)** - Type-safe JavaScript for better development experience.
- **Framer Motion** - A library for animations in React applications.
- **Socket.io** - Real-time communication library for web applications.

---

## Features

1. **Authentication:**
   - User registration and login with Clerk.
   - Secure session management.
   - Protected routes for user-specific data.

2. **AI Features:**
   - Integration with AI-driven models for dynamic data analysis.
   - User interaction with AI-based tools through the frontend interface.

3. **Real-time Data:**
   - Real-time communication using **Socket.io** for dynamic data updates.

4. **UI Components:**
   - Interactive UI components using **Radix UI** for accessibility and customization.

5. **Data Management:**
   - Data storage and management using **Prisma** and **PostgreSQL** (or any compatible database).
   
6. **Styling:**
   - Tailwind CSS for responsive design and styling.

---

## Contributing

We welcome contributions from everyone. If you would like to contribute to HackForgeAi, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes.
4. Test your changes.
5. Open a pull request.

### Code Style

- We use **Prettier** for code formatting and **ESLint** for linting.
- Please run the formatter and linter before submitting your code.

---

## License

HackForgeAi is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

