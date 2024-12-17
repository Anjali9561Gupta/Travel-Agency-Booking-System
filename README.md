# Travel Agency Booking System

A comprehensive travel agency booking system for users to browse tour packages, make bookings, and generate invoices. The system allows users to select tour packages, make payments, and get invoices in PDF format. It is built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Project Description

This project is designed to be a travel agency booking system where users can:

- View available tour packages
- Make bookings for selected packages
- Generate invoices in PDF format for completed bookings
- Store booking details in MongoDB

The backend handles user authentication, booking management, and invoice generation. The frontend is a React-based application that allows users to interact with the backend to make bookings and view invoices.

## Setup Instructions

Follow the instructions below to set up the project locally.

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (preferably the LTS version).
2. Install [MongoDB](https://www.mongodb.com/) or use a cloud database like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3. Install [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) for managing dependencies.

### Clone the Repository
git clone https://github.com/your-username/travel-agency-booking-system.git
cd travel-agency-booking-system

# Backend Setup
## 1. Navigate to the backend folder:

cd backend

## 2. Install the backend dependencies:


npm install

## 3. Create a .env file in the backend directory and configure your environment variables (e.g., MongoDB URI, secret keys).


<p>Start the backend server:</p>

npm start

<b>The backend server will start on http://localhost:5000 by default.</b>

# Frontend Setup

### 1. Navigate to the frontend folder:


cd frontend
### 2. Install the frontend dependencies:

npm install

### 3. Start the frontend development server:


npm start

<b>The frontend will start on http://localhost:3000 by default.</b>

# List of Implemented Features

## 1. Tour Package Management:

a. View available tour packages.

b. Add new packages with details like price, available dates, and images.

## 2. Booking System:

a. Users can select tour packages and book them.

b. Users can input personal details like name, email, phone, and special requests.

c. The system calculates the total price based on the selected package and number of travelers.

## 3. Invoice Generation:

a. After booking, users can generate an invoice in PDF format with booking details.

## 4. User Authentication:

a. Basic user authentication to manage bookings and invoice generation.

## 5. Admin Panel (optional):

a. Admins can manage tour packages (add, edit, delete).


## /travel-agency-booking-system
├── /backend                  # Backend code (Express, MongoDB, Invoice generation)
│   ├── /controllers          # Controller files for managing routes and logic
│   ├── /models               # Mongoose models for MongoDB
│   ├── /routes               # API route definitions
│   ├── /utils                # Helper functions (e.g., invoice generation)
│   ├── /invoices             # Directory where invoices are saved
│   ├── /node_modules         # Node.js dependencies
│   ├── .env                  # Environment variables for the backend
│   ├── server.js             # Entry point for the backend server
│   └── package.json          # Backend dependencies and scripts
│
├── /frontend                 # Frontend code (React, Redux, UI components)
│   ├── /src                  # Source code for the React app
│   │   ├── /components       # React components
│   │   ├── /pages            # React pages (e.g., Home, Booking)
│   │   ├── /redux            # Redux setup (actions, reducers, store)
│   │   ├── /styles           # CSS or styled-components for styling
│   │   ├── App.js            # Main App component
│   │   ├── index.js          # React entry point
│   ├── /public               # Public assets (images, favicon)
│   ├── package.json          # Frontend dependencies and scripts
│   └── .env                  # Environment variables for the frontend
│
├── .gitignore                # Git ignore file
├── README.md                 # Project description and setup instructions
└── package.json              # Root package file (with dependencies for both backend and frontend)
