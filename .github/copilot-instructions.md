# Training Schedule AI Instructions

This is a full-stack booking system for goalkeeper training. The project is split into `back_end` (Node/Express) and `frontend` (React/Vite).

## 🏗 Project Structure

- **Backend**: `back_end/` - Node.js serving a REST API on port 3000. Use ES Modules (`.mjs`).
- **Frontend**: `frontend/` - React 19 + Vite app.
- **Database**: Single MySQL database with Sequelize ORM.

## 🖥 Backend Development (`back_end/`)

- **Language**: Pure JavaScript with ES Modules. Always use `.mjs` extension for new files.
- **Pattern**: MVC + Routes.
  - **Models**: Defined in `src/models/*.model.mjs`. Associations in `src/models/index.mjs`.
  - **Controllers**: Main business logic lives here (`src/controllers/*.controller.mjs`).
    - **Transactions**: Complex write operations (like `createBooking`) MUST use `db.sequelize.transaction()`.
    - **Validation**: Perform input validation inside the controller or specific service functions.
  - **Routes**: aggregated in `src/routes/api.mjs`. Use `express.Router()`.
- **Authentication**: 
  - JWT based. Middleware `back_end/src/middelwares/auth.middleware.mjs` sets `req.userId`.
  - Admin checks rely on fetching the user inside the controller (e.g., `if (!user.isAdmin) throw ...`).

## 🎨 Frontend Development (`frontend/`)

- **Stack**: React 19, TypeScript, Vite, Tailwind CSS.
- **State Management**: Centralized in `hooks/useAppData.ts`.
  - This hook manages `bookings`, `players`, `settings`, etc.
  - Most logic for updating local state after API calls lives here.
- **Navigation**: Custom view-based routing (not React Router).
  - Main state: `view` (e.g., `'PLAYER_DASHBOARD'`, `'ADMIN_DASHBOARD'`).
  - Switched via `setView` in `App.tsx`.
- **API Layer**: `services/apiService.ts`
  - All HTTP requests go here.
  - **Mapping**: Responses often need manual mapping to match `types.ts` interfaces (e.g., snake_case DB fields to camelCase props).
  - **Auth**: Attaches `Authorization: Bearer <token>` from `localStorage`.
- **Styling**: Tailwind CSS utility classes.

## 💾 Database & Data Flow

- **ORM**: Sequelize instances are imported from `models/index.mjs`.
- **Transaction Flow**:
  1. Booking Creation -> Deducts Credits (User) -> Creates Transaction Record -> Creates Booking Record.
  2. All wrapped in one atomic transaction.
- **IDs**: Uses UUIDs (`uuidv4()`).

## 🚀 Workflows

- **Start Backend**: `cd back_end && npm start` (runs on `http://localhost:3000`)
- **Start Frontend**: `cd frontend && npm run dev`
- **Linting/Formatting**: Follow existing patterns (2 or 4 space indentation varies by file, check context).
- **Environment**: Backend expects `.env` with DB credentials. Frontend uses `http://localhost:3000/api` hardcoded in service layer.

## ⚠️ Important Conventions

- **File Naming**: 
  - Backend: `camelCase.mjs` (e.g., `bookings.controller.mjs`).
  - Frontend: `PascalCase.tsx` for components.
- **Error Handling**:
  - Backend: `try/catch` in controllers, send 500 JSON response on error.
  - Frontend: `apiService` functions throw errors, caught by UI or `useAppData`.
