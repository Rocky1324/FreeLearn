# EduConnect Haïti

EduConnect is a comprehensive digital platform designed to provide accessible education, career guidance, and opportunity tracking for young people in Haiti. It focuses on offline accessibility, local academic curricula integration, and support for high-need areas.

## Features

- **Educational Resources**: Access to local academic curricula and learning materials.
- **Career Guidance**: Tools and resources to help students track and plan their careers.
- **Offline Accessibility**: Designed to work in environments with limited internet connectivity.

## Technology Stack

This is a modern web application built with:
- **Frontend**: React, Vite, Tailwind CSS, Radix UI, React Query, Wouter.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: PostgreSQL, Drizzle ORM.
- **Monorepo**: Managed using pnpm workspaces.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (v9+)
- PostgreSQL Database

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/EduConnect.git
   cd EduConnect
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment variables:**
   Create a `.env` file at the root of the project with the following (adjust as needed):
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/educonnect
   PORT=5000
   ```

4. **Run the development server:**
   ```bash
   # Starts both frontend and backend
   pnpm run dev
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
