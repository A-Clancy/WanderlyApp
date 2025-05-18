# Wanderly

## Overview

Wanderly is a web application designed to help users explore and organise Points of Interest (POIs) in different locations. Users can create and manage categories to store POIs, making it easier to plan trips, discover new places, and keep track of interesting locations.

## Inspiration

This project was inspired by an idea originally developed during a **Techstars Startup Weekend in 2017**. The goal was to create an app that allows users to find and organise unique locations beyond mainstream tourist spots, giving travellers a more personalised and meaningful exploration experience.

At the time, our team lacked the expertise to create a working model. The idea has since been overtaken by a multitude of other travel apps, but it's satisfying to finally attempt a version of it now.

## Features

- **JWT Authentication**: Secure login using JSON Web Tokens.
- **Password Hashing**: User passwords are stored using bcrypt hashing with salting (Authentication Level 2).
- **Input Validation**: All user and POI input is validated and sanitised using Joi (Authentication Level 1).
- **Category Management**: Create and delete user-defined categories.
- **Point of Interest (POI) Management**: Add POIs to categories with descriptions and coordinates.
- **Image Upload Support**: POIs can store multiple Cloudinary-hosted images (Images Level 3+).
- **MongoDB Integration**: Persistent database storage using MongoDB Atlas or local MongoDB.
- **Swagger Documentation**: Live API documentation available at `/documentation`.
- **Admin Dashboard**: View system-wide analytics like user, category, and POI counts.
- **Testing**: Includes model and API-level tests using Mocha and Chai.
- **Dev Mode Support**: Nodemon available for live-reload development workflow.

## Admin Access

A basic admin route is available at `/admin` and is restricted to a hardcoded account:

- **Admin Email**: `admin@example.com`

Only a user with this email can access the admin dashboard.

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB running
- Git

### Steps

1. **Clone the repository**:
   ```sh
   git clone https://github.com/YOUR-USERNAME/Wanderly.git
   cd Wanderly
   ```

2. **Install the dependencies**:
   ```sh
   npm install
   ```

3. **Set up a `.env` file** including the following values:
   ```env
   PORT=3000
   COOKIE_NAME=sid
   COOKIE_PASSWORD=your_secure_cookie_password
   MONGO_URL=mongodb://localhost:27017/wanderly
   ```

4. **Start the application**:
   ```sh
   npm start
   ```
   or
   ```sh
   npm run dev
   ```

### Technologies

- **Backend**: Node.js, Hapi.js
- **Frontend**: Handlebars (used for rendering admin dashboard and testing)
- **Database**: MongoDB (local or Atlas)
- **Authentication**: JWT (secure login), bcrypt (password hashing)
- **API Documentation**: Swagger via hapi-swagger

## Roadmap

- Ensure POIs are scoped to each user (currently all POIs are visible globally)
- Improve Swagger examples for image handling
- Optional: Add OAuth login support (Authentication Level 3+)

## Git Branching

To test additional features the following branches were created:

| Branch                   | Purpose                                       |
|--------------------------|-----------------------------------------------|
| `main`                  | Working version                                |
| `feature/mongo-atlas`   | Migration from local MongoDB to MongoDB Atlas  |
| `feature/glitch-deploy` | Deployment adjustments for Glitch hosting      |

Each feature branch is merged back into `main` once tested and tagged.

## Contribution

Currently closed to contributions — this is an individual academic project.

## License

MIT
