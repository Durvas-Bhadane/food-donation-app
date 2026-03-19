# ANNADATA – Food Sharing Network

Annadata is a complete full-stack MERN application aimed at reducing food waste by connecting Food Donors (individuals, restaurants, weddings) with NGOs and needy communities. 

The application utilizes a beautiful Awwwards-style UI, powered by React, Tailwind CSS, and Framer Motion.

## 📂 Project Structure

```text
food donation/
├── backend/                  # Node.js + Express Backend
│   ├── config/               # Database Configuration
│   ├── controllers/          # Business logic (Auth, Donations, Admin)
│   ├── middleware/           # JWT & RBAC Middleware
│   ├── models/               # MongoDB Mongoose Schemas
│   ├── routes/               # Express API Routes
│   ├── .env                  # Environment Variables
│   ├── server.js             # Main Backend Entry Point
│   └── seeder.js             # Script to initialize Admin User
└── frontend/                 # React + Vite Frontend
    ├── src/
    │   ├── components/       # Shared UI (Navbar, Footer)
    │   ├── context/          # React Context (Auth)
    │   ├── pages/            # View Pages (Home, Login, Register)
    │   │   └── dashboards/   # Role-based Dashboards (Donor, NGO, Admin)
    │   ├── App.jsx           # Application Router
    │   └── index.css         # Tailwind & GLobal Styles
    └── tailwind.config.js    # Tailwind Configuration
```

## 🛠 Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Running locally on `mongodb://127.0.0.1:27017` or update the `.env` with a Mongo Atlas URI)

## 🚀 Setup Instructions

### 1. Start the Backend server

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Seed the database with the initial Admin user:
   ```bash
   node seeder.js
   ```
   *(This will create an admin account: `admin@annadata.in` | Password: `admin`)*
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *(The server will run on `http://localhost:5000`)*

### 2. Start the Frontend React App

1. Open a **new** terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(The app will open locally, typically at `http://localhost:5173`)*

## 🌍 Working Flow

1. **Admin Login:** Use the seeded credentials above to log into the Admin Dashboard.
2. **NGO Registration:** Register a new account selecting the "NGO" role. The NGO will be placed in a `Pending Verification` state.
3. **Admin Verification:** The Admin approves the NGO from the Admin Dashboard.
4. **Donor Creation:** Register a new account selecting the "Food Donor" role.
5. **Donate Food:** The Donor logs in and creates a new food donation.
6. **Admin Verification:** The Admin approves the donation (to prevent spam).
7. **Request Pickup:** The verified NGO sees the approved food on their dashboard and clicks "Request Pickup".
8. **Admin Assignment:** The Admin assigns the pickup request to the NGO.
9. **Donation Completion:** Once picked up, the NGO clicks "Mark Collected" to successfully complete the flow. 
   *(This heavily increments the App's overarching analytics).*
