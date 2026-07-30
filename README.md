<p align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.2.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-4.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini%20AI-Integrated-8B5CF6?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

<h1 align="center">🎪 EventNexus</h1>
<h3 align="center"><em>The Hub of Global Events</em></h3>

<p align="center">
  A full-stack, real-time event booking platform with AI-powered recommendations, <br/>
  built with Spring Boot, React 19, PostgreSQL, and Google Gemini AI.
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [AI Chatbot](#-ai-chatbot)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🔮 Overview

**EventNexus** is a premium, production-grade event booking system that enables users to discover, book, and manage events in real-time. It features a stunning glassmorphic UI, real-time seat booking with concurrency control, an intelligent waitlist system, and an AI-powered chatbot that helps users find the perfect event.

Whether you are an **attendee** looking for the next great experience or an **organizer** hosting your own event, EventNexus provides a seamless, modern platform to make it happen.

---

## ✨ Key Features

### 🎫 Event Management
- **Browse & Discover** — Explore events with advanced filtering by category, price, location, and popularity
- **Create & Host** — Organizers can create, edit, and delete their own events
- **Real-Time Booking** — Book seats with instant availability updates and concurrency-safe locking
- **Smart Waitlist** — Automatically queues users when events sell out and allocates seats upon cancellation

### 🤖 AI-Powered Chatbot
- **Context-Aware** — Powered by Google Gemini AI, the chatbot understands every event's details
- **Event-Specific** — On event detail pages, it answers questions about that specific event
- **Global Guide** — On the explore page, it recommends events from the entire catalog based on user preferences
- **Quick Reply Chips** — Pre-built suggestion buttons for instant interaction

### 🎨 Premium UI/UX
- **Glassmorphism Design** — Modern frosted-glass card effects with backdrop blur
- **Dark Mode** — Full dark/light theme toggle with smooth transitions
- **Micro-Animations** — Framer Motion powered transitions, hover effects, and page animations
- **Responsive Layout** — Pixel-perfect on desktop, tablet, and mobile
- **Custom Design System** — Curated color palette, typography (Space Grotesk + Inter), and reusable component classes

### 🔐 Authentication & Authorization
- **User Registration** — Separate flows for attendees and organizers
- **Role-Based Access** — `USER` and `ORGANIZER` roles with different permissions
- **Secure Login/Logout** — Spring Security integrated authentication
- **User Dashboard** — View booked events, manage profile, and track bookings

### 🐳 DevOps
- **Docker Compose** — One-command PostgreSQL database setup
- **Multi-Stage Dockerfile** — Optimized production builds with Maven + JRE
- **Swagger/OpenAPI** — Auto-generated interactive API documentation

---

## 🛠 Tech Stack

| Layer        | Technology                                                                 |
|--------------|---------------------------------------------------------------------------|
| **Frontend** | React 19, TypeScript, Tailwind CSS 3.4, Framer Motion, React Router v7   |
| **Backend**  | Java 17, Spring Boot 3.2.5, Spring Security, Spring Data JPA, Spring AI  |
| **Database** | PostgreSQL 15 (via Docker)                                                |
| **AI**       | Google Gemini Flash (REST API via `X-goog-api-key` header)                |
| **API Docs** | SpringDoc OpenAPI (Swagger UI)                                            |
| **Build**    | Maven (backend), Create React App (frontend)                              |
| **DevOps**   | Docker, Docker Compose                                                    |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│                                                         │
│  ┌──────────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  React 19 +  │  │ Tailwind │  │  Framer Motion   │  │
│  │  TypeScript  │  │   CSS    │  │   Animations     │  │
│  └──────┬───────┘  └──────────┘  └──────────────────┘  │
│         │                                               │
│  ┌──────┴───────────────────────────────────────────┐   │
│  │            Axios HTTP Client (REST)              │   │
│  └──────┬───────────────────────────────────────────┘   │
│         │                                               │
│  ┌──────┴───────────────────────────────────────────┐   │
│  │         Gemini AI REST API (Client-Side)         │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTP (port 8081)
┌─────────────────────────┴───────────────────────────────┐
│                  BACKEND (Spring Boot)                    │
│                                                         │
│  ┌────────────┐  ┌──────────────┐  ┌────────────────┐   │
│  │ Controllers│  │   Services   │  │  Repositories  │   │
│  │  (REST)    │──│  (Business)  │──│    (JPA)       │   │
│  └────────────┘  └──────────────┘  └───────┬────────┘   │
│                                            │            │
│  ┌─────────────────┐  ┌───────────────────┘            │
│  │ Spring Security │  │                                 │
│  └─────────────────┘  │                                 │
└───────────────────────┼─────────────────────────────────┘
                        │ JDBC (port 5432)
┌───────────────────────┴─────────────────────────────────┐
│              DATABASE (PostgreSQL 15)                     │
│                                                         │
│  ┌──────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │  events  │  │ event_bookings │  │    users       │   │
│  └──────────┘  └────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
EventNexus/
├── 📂 frontend/                    # React Frontend Application
│   ├── 📂 public/                  # Static assets & index.html
│   └── 📂 src/
│       ├── 📂 components/
│       │   ├── 📂 events/
│       │   │   ├── EventCard.tsx          # Reusable event card component
│       │   │   └── EventAIChatbot.tsx     # Gemini AI chatbot widget
│       │   └── 📂 layout/
│       │       ├── Navbar.tsx             # Navigation bar with theme toggle
│       │       └── Footer.tsx             # Site footer
│       ├── 📂 contexts/
│       │   └── AuthContext.tsx            # Global auth state management
│       ├── 📂 data/
│       │   └── seedEvents.ts             # Seed data for demo events
│       ├── 📂 pages/
│       │   ├── HomePage.tsx              # Landing page with hero section
│       │   ├── BrowseEventsPage.tsx       # Event explorer with filters
│       │   ├── EventDetailPage.tsx        # Individual event details & booking
│       │   ├── CreateEventPage.tsx        # Event creation form (organizers)
│       │   ├── DashboardPage.tsx          # User dashboard & bookings
│       │   ├── LoginPage.tsx             # User login
│       │   ├── RegisterPage.tsx          # User registration
│       │   ├── AboutPage.tsx             # About page
│       │   ├── ContactPage.tsx           # Contact page
│       │   ├── PricingPage.tsx           # Pricing tiers
│       │   └── NotFoundPage.tsx          # 404 page
│       ├── 📂 services/
│       │   └── api.ts                    # Axios API client
│       ├── App.tsx                        # Root app with routing
│       ├── index.tsx                      # React entry point
│       └── index.css                     # Global styles & design tokens
│
├── 📂 src/main/java/com/eventnexus/     # Spring Boot Backend
│   ├── EventNexusApplication.java        # Application entry point
│   ├── 📂 config/
│   │   ├── CorsConfig.java              # CORS configuration
│   │   └── SecurityConfig.java          # Spring Security setup
│   ├── 📂 controller/
│   │   ├── EventController.java         # Event CRUD & booking API
│   │   ├── UserController.java          # Auth & user API
│   │   └── AiController.java           # AI endpoint
│   ├── 📂 dto/
│   │   ├── BookingRequest.java          # Booking request DTO
│   │   ├── BookingResponse.java         # Booking response DTO
│   │   ├── UserRequest.java            # Auth request DTO
│   │   └── AuthResponse.java           # Auth response DTO
│   ├── 📂 exception/
│   │   └── GlobalExceptionHandler.java  # Centralized error handling
│   ├── 📂 model/
│   │   ├── Event.java                   # Event entity with booking logic
│   │   ├── User.java                    # User entity
│   │   └── WaitlistEntry.java          # Waitlist queue entry
│   ├── 📂 repository/
│   │   ├── EventRepository.java        # Event JPA repository
│   │   └── UserRepository.java         # User JPA repository
│   └── 📂 service/
│       ├── EventService.java           # Event business logic
│       ├── UserService.java            # User auth business logic
│       └── AiService.java             # AI service
│
├── Dockerfile                           # Multi-stage Docker build
├── docker-compose.yml                   # PostgreSQL container config
├── pom.xml                              # Maven dependencies
└── README.md                            # You are here! 👋
```

---

## 🚀 Getting Started

### Prerequisites

| Tool           | Version  | Required |
|----------------|----------|----------|
| Java JDK       | 17+      | ✅       |
| Node.js        | 18+      | ✅       |
| npm             | 9+       | ✅       |
| Docker Desktop | Latest   | ✅       |
| Maven          | 3.9+     | Optional (wrapper included) |

### 1. Clone the Repository

```bash
git clone https://github.com/syedabdulla0710/EventNexus.git
cd EventNexus
```

### 2. Start the Database

```bash
docker-compose up -d
```

This spins up a PostgreSQL 15 container on port `5432` with:
- **Database:** `eventnexus`
- **Username:** `postgres`
- **Password:** `password`

### 3. Start the Backend

```bash
# Using Maven Wrapper (recommended)
./mvnw spring-boot:run

# Or with Maven installed
mvn spring-boot:run
```

The Spring Boot server starts on **`http://localhost:8081`**

### 4. Start the Frontend

```bash
cd frontend
npm install
npm start
```

The React dev server starts on **`http://localhost:3000`**

### 5. Open the App

Navigate to [http://localhost:3000](http://localhost:3000) and start exploring! 🎉

---

## 📡 API Documentation

### Swagger UI

Once the backend is running, visit:

```
http://localhost:8081/swagger-ui.html
```

### REST API Endpoints

#### Events

| Method   | Endpoint                       | Description                  |
|----------|--------------------------------|------------------------------|
| `GET`    | `/api/events`                  | List all events              |
| `POST`   | `/api/events`                  | Create a new event           |
| `GET`    | `/api/events/{eventId}`        | Get event by ID              |
| `DELETE` | `/api/events/{eventId}`        | Delete an event              |
| `POST`   | `/api/events/{eventId}/book`   | Book seats for an event      |
| `POST`   | `/api/events/{eventId}/cancel` | Cancel booked seats          |

#### Users

| Method   | Endpoint                            | Description                  |
|----------|-------------------------------------|------------------------------|
| `POST`   | `/api/users/register`               | Register as attendee         |
| `POST`   | `/api/users/register-organizer`     | Register as organizer        |
| `POST`   | `/api/users/login`                  | Login                        |
| `POST`   | `/api/users/logout`                 | Logout                       |
| `GET`    | `/api/users/{username}/bookings`    | Get user's booked events     |
| `GET`    | `/api/users/all`                    | List all users               |

### Example: Book Seats

```bash
curl -X POST http://localhost:8081/api/events/EVT001/book \
  -H "Content-Type: application/json" \
  -d '{
    "username": "syed",
    "seats": 2
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully booked 2 seat(s)",
  "bookedSeats": [1, 2],
  "waitlisted": false
}
```

---

## 🤖 AI Chatbot

EventNexus features a built-in AI chatbot powered by **Google Gemini Flash**.

### How It Works

| Page           | Behavior                                                                 |
|----------------|-------------------------------------------------------------------------|
| **Event Detail** | Answers questions about the specific event (price, location, why attend) |
| **Explore**      | Acts as a global guide, recommending events from the full catalog        |

### Configuration

The chatbot uses the Gemini REST API with the `X-goog-api-key` header. To use your own API key:

1. Get a key from [Google AI Studio](https://aistudio.google.com/)
2. Update the `API_KEY` constant in `frontend/src/components/events/EventAIChatbot.tsx`

```typescript
const API_KEY = 'YOUR_GEMINI_API_KEY';
```

> **Note:** If the API key is invalid or the API is unreachable, the chatbot automatically falls back to intelligent mock responses so the UI never breaks.

---

## 📸 Screenshots

> Add your screenshots here before pushing to GitHub!

| Page | Description |
|------|-------------|
| Home Page | Hero section with animated counters and gradient backgrounds |
| Explore Events | Filterable event grid with category chips and search |
| Event Detail | Full event page with booking UI and AI chatbot |
| AI Chatbot | Floating chat widget with quick replies and Gemini responses |
| Dashboard | User's booked events and profile management |
| Dark Mode | Full dark theme with glassmorphic cards |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 👤 Author

**SYED ABDULLA**

- GitHub: [@syedabdulla0710](https://github.com/syedabdulla0710)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Built with ❤️ by SYED ABDULLA</strong><br/>
  <em>EventNexus — The Hub of Global Events</em>
</p>
