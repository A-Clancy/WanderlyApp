# Wanderly

## Overview

Wanderly is a web application designed to help users explore and organise Points of Interest (POIs) in different locations. Users can create and manage categories to store POIs, making it easier to plan trips, discover new places, and keep track of interesting locations.

## Inspiration

This project was inspired by an idea originally developed during a **Techstars Startup Weekend in 2017**. The goal was to create an app that allows users to find and organise unique locations beyond mainstream tourist spots, giving travellers a more personalised and meaningful exploration experience.

At the time, our team lacked the expertise to create a working model. The idea has since been overtaken by a multitude of other travel apps, but it's satisfying to finally attempt a version of it now.

## Features

- **User Authentication**: Sign up, log in, and manage your account.
- **Category Management**: Create and delete user-defined categories.
- **Point of Interest (POI) Management**: Add POIs to categories with descriptions and coordinates.
- **Bulma-Based UI**: A clean and responsive interface using the Bulma CSS framework.
- **MongoDB Integration**: All data is now stored persistently using MongoDB.
- **Swagger Documentation**: Live API documentation available at `/documentation`.
- **Admin Dashboard**: View system-wide analytics like user, category, and POI counts.
- **Testing**: Includes model and API-level tests using Mocha and Chai.
- **Dev Mode Support**: Nodemon can be used for development.

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

2. **Install the dependencis**:
npm install

3. **Set up a .env file including the following alues**:
PORT=3000
COOKIE_NAME=sid
COOKIE_PASSWORD=your_secure_cookie_password
MONGO_URL=mongodb://localhost:27017/wanderly

4. **Start the Application**:
npm start
   or
npm run dev (development environment)

### Technologies
- Backend: Node.js, Hapi.js

 - Frontend: Handlebars, Bulma

- Database: MongoDB

- Authentication: Cookie-based sessions

- API Documentation: Swagger via hapi-swagger

## Roadmap

- Migrate to CloutAtlas
- Add interactive maps for POIs
- Enable image uploads

## Contribution



## Licence

