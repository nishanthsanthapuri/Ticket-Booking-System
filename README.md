🎟️ AI-Powered Event Ticket Booking Platform

A full-stack, production-ready ticket booking platform with AI search, role-based dashboards, real-time booking, QR-based check-in, payments, and cloud deployment.

Built with Node.js + React + FastAPI + MongoDB + Redis, deployed on Render with cloud databases.

🌐 Live Deployment
Service	URL
Frontend	https://ticket-booking-frontend-3poz.onrender.com

Backend API	https://ticket-booking-backend-m8qj.onrender.com

AI Service	https://ticket-booking-ai-service.onrender.com

Health Check	/health
🧠 High-Level Architecture
┌────────────┐
│  Frontend  │  (React + Vite)
└─────┬──────┘
      │ HTTP (REST)
┌─────▼──────┐
│  Backend   │  (Node.js + Express)
│            │
│ ┌────────┐ │
│ │ Redis  │ │  (rate limit, cache)
│ └────────┘ │
│ ┌────────┐ │
│ │MongoDB │ │  (events, bookings)
│ └────────┘ │
└─────┬──────┘
      │ HTTP
┌─────▼──────┐
│ AI Service │  (FastAPI + NLP)
└────────────┘

🎯 Key Features
👥 User Roles

User – browse events, book tickets, view QR

Organizer – create events, manage tickets, view bookings & revenue

Admin – approve events, manage organizations, refunds

Staff – scan QR codes and check-in attendees

🎫 Event & Booking System

Event creation & admin approval flow

Ticket types (VIP / General)

Quantity tracking & sold count

Booking lifecycle:

Create → Pay → QR generation → Check-in

🧠 AI-Powered Features

Natural language event search
“music events in Bangalore this weekend”

AI-parsed filters

Event similarity ranking

Recommendation & feedback endpoints

💳 Payments & Reliability

Razorpay integration (mock-ready)

Idempotent booking & payment APIs

Redis-based rate limiting

Refund & retry support

📱 QR Code Check-In

Secure QR generation

Staff / organizer scan

Double-entry prevention

Check-in timestamps

🛠️ Tech Stack
Frontend

React (Vite)

React Router

Axios

CSS (Global theme + UI polish)

Backend

Node.js

Express.js

MongoDB (Mongoose)

Redis (ioredis)

Razorpay SDK

QR code generator

AI Service

FastAPI

Sentence Transformers

NLP parsing

Scikit-learn

Torch

Infrastructure

Render (Backend + Frontend + AI)

MongoDB Atlas

Redis Cloud

Environment-based configuration

📂 Project Structure
ticket-booking-platform/
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── events/
│   │   │   ├── tickets/
│   │   │   ├── bookings/
│   │   │   ├── dashboard/
│   │   │   └── waitlist/
│   │   ├── middlewares/
│   │   ├── config/
│   │   ├── utils/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── ai-service/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── embedding_service.py
│   │   ├── nlp_parser.py
│   │   └── main.py
│   └── requirements.txt
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

🔐 Environment Variables
Backend (Render)
PORT=5000
MONGO_URI=your_mongodb_uri
REDIS_URL=redis://default:password@host:port
RAZORPAY_KEY_ID=xxxx
RAZORPAY_KEY_SECRET=xxxx
AI_SERVICE_URL=https://ticket-booking-ai-service.onrender.com

Frontend (Render)
VITE_API_BASE_URL=https://ticket-booking-backend-m8qj.onrender.com/api

AI Service
PORT=8000

🔁 API Flow Example (Booking)
User → Event Page
     → Select Ticket
     → Create Booking
     → Payment
     → QR Generated
     → Staff Check-In

🧪 Testing Checklist
Backend

/health returns OK

Redis connected

MongoDB connected

Rate limiting works

Frontend

Events load

Admin approval works

Organizer dashboard shows bookings

QR scan blocks double entry

AI Service

/search endpoint returns ranked events

/health returns AI service up

🚀 Deployment Summary
Component	Platform	Type
Frontend	Render	Static Site
Backend	Render	Web Service
AI Service	Render	Web Service
MongoDB	Atlas	Cloud
Redis	Redis Cloud	Cloud
