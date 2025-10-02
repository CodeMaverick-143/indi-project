# Threaded Comments App

A modern, full-stack web application for threaded comments with user authentication, built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Threaded Comments**: Hierarchical comment system with nested replies
- **Real-time Interactions**: Like comments and view comment threads
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **RESTful API**: Clean backend architecture with Express.js
- **Database**: MongoDB with Prisma ORM for type-safe database operations

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma** - Next-generation ORM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB** - NoSQL document database

## Project Structure

```
indi-project/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── pages/           # React components/pages
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # Application entry point
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── backend/                 # Node.js backend API
│   ├── routes/              # API route handlers
│   │   ├── auth.js          # Authentication routes
│   │   ├── comment.js       # Comment CRUD operations
│   │   └── users.js         # User management
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── server.js            # Express server setup
│   └── package.json         # Backend dependencies
├── README.md                # Project documentation
└── LICENSE                  # Project license
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indi-project
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL="mongodb://localhost:27017/threaded-comments"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=5001
   ```

4. **Generate Prisma client and set up database**
   ```bash
   npm run build
   npx prisma db push
   ```

5. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The API will be available at `http://localhost:5001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Building for Production

1. **Build the backend**
   ```bash
   cd backend
   npm run build
   ```

2. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Comments
- `GET /api/comments` - Get all comments
- `POST /api/comments` - Create a new comment
- `PUT /api/comments/:id` - Update a comment
- `DELETE /api/comments/:id` - Delete a comment
- `POST /api/comments/:id/like` - Like/unlike a comment

### Users
- `GET /api/users` - Get user information

### Health Check
- `GET /api/health` - Server health status

## Database Schema

The application uses two main models:

- **User**: Stores user authentication and profile information
- **Comment**: Stores comments with support for nested replies through self-referencing relationships

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or run into issues, please open an issue on the repository.

---

**Happy coding!**