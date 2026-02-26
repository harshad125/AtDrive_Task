# AtDrive

A full‑stack web application designed for a premium user experience, high performance, and scalability. This project features a **React + Vite** frontend integrated with a **Node.js + Express** backend, follow a modular architecture suitable for modern web development.

---

## Overview

AtDrive is a comprehensive solution that bridges a modern UI with a robust API. It includes a feature-rich frontend built with Material UI (Mantis theme) and a versatile backend capable of handling multiple database types and secure authentication.

---

## Tech Stack

The application leverages a professional-grade stack for maximum productivity:

- **Frontend:**
  - **React 19** – The latest declarative UI library.
  - **Vite 7** – Ultra-fast frontend build tool.
  - **Material UI (MUI)** – Sophisticated component library for a premium look and feel.
  - **Redux Toolkit** – Efficient state management.
  - **Formik & Yup** – Robust form handling and validation.
- **Backend:**
  - **Node.js & Express** – Scalable server-side runtime and framework.
  - **Mongoose / Sequelize** – Support for both MongoDB and SQL databases.
  - **JWT (JSON Web Tokens)** – Secure authentication and authorization.
  - **Docker** – Containerized environment for consistent deployment.

---

## Project Structure

The repository follows a clean, decoupled structure:

```text
AtDrive
│
├── Frontend/           # React + Vite application
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # View components
│   │   ├── store/      # Redux state management
│   │   └── api/        # API integration layer
│   └── .env            # Frontend environment variables
│
├── Backend/            # Node.js + Express API
│   ├── src/
│   │   ├── controllers/# Business logic
│   │   ├── models/     # Database schemas
│   │   └── routes/      # API endpoints
│   ├── index.js        # Server entry point
│   ├── .env            # Backend environment variables
│   └── docker-compose.yml
│
├── .gitignore          # Root ignore file
└── README.md           # This file
```

---

## Prerequisites

Ensure you have the following installed before setting up the project:

- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **yarn**
- **Docker** (optional, for containerized execution)
- **MongoDB / MySQL / PostgreSQL** (whichever database you choose to configure)

---

## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd AtDrive
   ```

2. **Setup the Backend:**
   ```bash
   cd Backend
   npm install
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../Frontend
   npm install
   ```

---

## Environment Variables

Configuration is handled through `.env` files. Ensure you create these files in their respective directories.

### Backend (`Backend/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/atdrive
JWT_SECRET=your_super_secret_key
NODE_ENV=development
# Add other DB or service credentials here
```

### Frontend (`Frontend/.env`)

*Note: Vite requires variables to be prefixed with `VITE_`.*

```env
VITE_API_URL=http://localhost:5000/api
# Add other public variables here
```

---

## Running the Application

### Development Mode

- **Start the backend:**
  ```bash
  cd Backend
  npm run dev
  ```
  *Runs with `nodemon` for hot-reloading.*

- **Start the frontend:**
  ```bash
  cd Frontend
  npm run dev
  ```
  *Runs the Vite dev server (usually at http://localhost:5173).*

### Using Docker

You can spin up the backend and its dependencies using Docker:
```bash
cd Backend
docker-compose up -d
```

---

## Helpful Scripts

### Backend (`Backend/package.json`)

| Script | Command             | Description                   |
| ------ | ------------------- | ----------------------------- |
| `dev`  | `nodemon index.js`  | Starts dev server with reload |
| `start`| `node index.js`     | Starts production server      |

### Frontend (`Frontend/package.json`)

| Script     | Command        | Description                      |
| ---------- | -------------- | -------------------------------- |
| `dev`      | `vite`         | Starts Vite dev server           |
| `build`    | `vite build`   | Builds for production            |
| `preview`  | `vite preview` | Previews the build locally       |
| `lint`     | `eslint .`     | Runs linting checks              |

---

## Security & Best Practices

- **Security:** Never commit your `.env` files to source control. They are ignored by the root `.gitignore`.
- **Modularity:** Keep business logic in the `Backend/src/controllers` and UI logic in `Frontend/src`.
- **API Client:** Use the centralized API layer in the frontend to manage requests consistently.

---

**Happy coding with AtDrive! 🚀**
