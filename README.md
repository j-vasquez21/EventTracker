# 📅 Event Tracker

A full-stack web application designed to help users efficiently track and manage their personal and professional events. Built with a modern tech stack focusing on performance, scalability, and a sleek user interface.

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT and bcrypt.
- **Event Management**: Create, read, update, and delete (CRUD) events seamlessly.
- **Dashboard**: View all your upcoming events in a clean, organized dashboard.
- **Responsive Design**: A modern, mobile-friendly interface built with React.

## 💻 Tech Stack

**Frontend:**
- [React](https://reactjs.org/) (v19)
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React Router DOM](https://reactrouter.com/) - Declarative routing
- [Axios](https://axios-http.com/) - Promise-based HTTP client

**Backend:**
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) - Robust relational database
- [Prisma ORM](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [JSON Web Tokens (JWT)](https://jwt.io/) & [bcrypt](https://www.npmjs.com/package/bcrypt) - Authentication & Security

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database running locally or on the cloud.

### 1. Repository Setup
```bash
# Clone the repository (if applicable)
git clone https://github.com/j-vasquez21/EventTracker.git
cd EventTracker
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_super_secret_jwt_key"
PORT=5000
```

Run database migrations and start the server:
```bash
npx prisma migrate dev --name init
npm run dev
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5173` (or the port specified by Vite), and it will proxy API requests to the backend.

## 📸 Screenshots

Coming soon!

## 💡 Motivation

As a college student pursuing a career in software engineering, I built this project to deepen my understanding of full-stack development, RESTful APIs, and database management. It demonstrates my ability to integrate a modern React frontend with a robust Node.js/Express backend while implementing secure user authentication and a clean, intuitive user experience. 

## 🤝 Contact

**Jerry Vasquez**  
[GitHub Profile](https://github.com/j-vasquez21)

---
*Note to recruiters and hiring managers: Thank you for taking the time to review my work! I am actively seeking software engineering internship opportunities.*