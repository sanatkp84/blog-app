# Vlog Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for creating and managing vlogs.

## Features

- Create, read, update, and delete vlogs (CRUD operations)
- Responsive design
- Docker containerization for easy deployment
- MongoDB for data storage

## Project Structure

```
blog-app/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   ├── .env
│   ├── Dockerfile
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   ├── public/
│   ├── .env
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Docker and Docker Compose
- Node.js and npm (for local development)

## Getting Started

### Using Docker

1. Clone the repository
2. Navigate to the project directory
3. Run the application using Docker Compose:

```bash
docker-compose up
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5050

### Local Development

#### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following content:
```
PORT=5050
MONGODB_URI=mongodb://localhost:27017/vlogapp
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

#### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following content:
```
REACT_APP_API_URL=http://localhost:5050/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will be available at http://localhost:8080.

## API Endpoints

- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get a specific blog
- `POST /api/blogs` - Create a new blog
- `PUT /api/blogs/:id` - Update a blog
- `DELETE /api/blogs/:id` - Delete a blog

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose
