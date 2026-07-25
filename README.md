# 🎫 EventNexus — Real-Time Event Booking Platform

A full-stack **real-time event booking platform** built with **Java 17 / Spring Boot 3** and **React (TypeScript)**. Features concurrent seat management, automatic waitlist promotion, role-based access control, and a modern event discovery UI.

> Built as a demonstration of system design, data structures, concurrency handling, and full-stack development skills.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Real-Time Seat Booking** | Thread-safe concurrent booking with `synchronized` methods |
| **Automatic Waitlist Promotion** | FIFO queue auto-promotes users when seats become available |
| **Role-Based Access** | USER (book events) vs ORGANIZER (create events) roles |
| **Event Discovery** | Search, filter by category, browse upcoming events |
| **Secure Authentication** | BCrypt password hashing with Spring Security |
| **RESTful API** | Documented with Swagger/OpenAPI (SpringDoc) |
| **Input Validation** | Jakarta Bean Validation on all request DTOs |
| **Global Error Handling** | Centralized `@ControllerAdvice` with consistent error format |

---

## 🏗️ Architecture

```
┌─────────────────┐     HTTP/REST     ┌──────────────────────────────────┐
│   React + TS    │ ◄──────────────► │       Spring Boot 3 Backend       │
│   (Frontend)    │    Port 3000      │          Port 8080                │
└─────────────────┘                   │                                  │
                                      │  Controller ──► Service ──► Repo │
                                      │       │            │          │   │
                                      │    DTOs +      Business   ConcurrentHashMap
                                      │  Validation     Logic     (In-Memory Store)
                                      │       │                          │
                                      │  GlobalExceptionHandler         │
                                      │  SecurityFilterChain             │
                                      └──────────────────────────────────┘
```

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Java 17, Spring Boot 3.2, Spring Security, Spring Validation |
| **Frontend** | React 19, TypeScript, React Router, Axios, Bootstrap 5 |
| **API Docs** | SpringDoc OpenAPI (Swagger UI) |
| **Build** | Maven (backend), npm (frontend) |
| **Auth** | BCrypt, HTTP Basic, Role-based access (USER / ORGANIZER) |
| **Data Store** | In-memory ConcurrentHashMap (no external DB required) |

---

## 📊 Data Structures & Design Patterns

### Data Structures Used

| Structure | Usage | Why |
|---|---|---|
| `TreeMap<Integer, String>` | Seat allocation (seat# → username) | O(log n) insert, maintains sorted seat order |
| `ConcurrentLinkedQueue<WaitlistEntry>` | Waitlist queue | Thread-safe FIFO ordering for fair promotion |
| `ConcurrentHashMap<String, Event>` | Event storage | O(1) lookup, thread-safe concurrent access |
| `ConcurrentHashMap<String, User>` | User storage | O(1) lookup, thread-safe concurrent access |

### Design Patterns

| Pattern | Where |
|---|---|
| **MVC** | Controller → Service → Repository layered architecture |
| **Repository** | `EventRepository`, `UserRepository` abstract data access |
| **DTO** | Request/Response DTOs separate API contract from domain model |
| **Singleton** | Spring-managed `@Service` and `@Repository` beans |
| **Observer** | Waitlist auto-promotion triggered on cancellation events |

---

## 🔒 Concurrency Handling

The seat booking system handles concurrent access through:

1. **`synchronized` methods** on `Event.bookSeats()` and `Event.cancelSeats()` prevent race conditions
2. **`ConcurrentHashMap`** in repositories for thread-safe read/write
3. **`ConcurrentLinkedQueue`** for waitlist operations

**Example scenario:**
> If an event has 1 seat left and User A and User B both try to book simultaneously, the `synchronized` block ensures only one succeeds. The other is automatically added to the waitlist.

---

## 📡 API Endpoints

### Events
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/events` | List all events | Public |
| `POST` | `/api/events` | Create a new event | Authenticated |
| `GET` | `/api/events/{id}` | Get event details | Public |
| `POST` | `/api/events/{id}/book` | Book seats | Authenticated |
| `POST` | `/api/events/{id}/cancel` | Cancel booking | Authenticated |

### Users
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/users/register` | Register as USER | Public |
| `POST` | `/api/users/register-organizer` | Register as ORGANIZER | Public |
| `POST` | `/api/users/login` | Login | Public |
| `POST` | `/api/users/logout` | Logout | Authenticated |
| `GET` | `/api/users/{username}/bookings` | Get user's booked events | Authenticated |

> 📖 **Interactive API Docs**: Available at `http://localhost:8080/swagger-ui` when the backend is running.

---

## 🚀 Getting Started

### Prerequisites
- **Java 17+** (JDK)
- **Maven 3.8+**
- **Node.js 18+** & **npm**

### 1. Start the Backend
    ```bash
# From the project root
mvn clean compile
mvn spring-boot:run
    ```
The backend starts at `http://localhost:8080`.
Swagger UI: `http://localhost:8080/swagger-ui`

### 2. Start the Frontend
```bash
cd frontend
npm install
# Note: Use 'yarn' or 'pnpm' if you encounter hanging issues on Windows with npm.
```

### 3. Start the development server
```bash
npm run dev
```

For detailed information about the new UI, tech stack, and design philosophy, please refer to the [web/README.md](web/README.md).
