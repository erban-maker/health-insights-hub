# Health Insights Hub

A comprehensive health risk assessment and insights web application built with React, TypeScript, and Node.js.

Detailed evolving project documentation is maintained in `PROJECT_DOCUMENTATION.md`.

## Features

- **Health Risk Calculator**: Assess personal health risks based on various factors
- **Interactive Forms**: User-friendly forms for collecting health data
- **Data Visualization**: Charts and graphs for health insights
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **shadcn/ui** component library
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Recharts** for data visualization

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **CORS** for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd health-insights-hub
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Setup backend**
   ```bash
   cd code-backend
   npm install
   ```

4. **Environment Configuration**

   **Frontend (.env):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_ENVIRONMENT=development
   ```

   **Backend (code-backend/.env):**
   ```env
   MONGODB_URI=mongodb://localhost:27017/health_insights_hub
   PORT=5000
   JWT_SECRET=your-secure-jwt-secret-here
   FRONTEND_URL=http://localhost:8080
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

6. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd code-backend
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000

## Project Structure

```
health-insights-hub/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Application pages/routes
│   ├── contexts/          # React contexts for state management
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and business logic
│   └── test/              # Test files
├── code-backend/          # Backend API server
│   ├── config/            # Database configuration
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   └── server.js          # Express server entry point
├── public/                # Static assets
└── package.json           # Frontend dependencies
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

### Predictions
- `GET /api/predictions` - Fetch authenticated user's prediction history
- `POST /api/predictions` - Save authenticated user's prediction

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
