# Wanderly

## Overview

Wanderly is a web application designed to help users explore and organise Points of Interest (POIs) in different locations. Users can create and manage categories to store POIs, making it easier to plan trips, discover new places, and keep track of interesting locations.

## Inspiration

This project was inspired by an idea originally developed during a **Techstars Startup Weekend in 2017**. The goal was to create an app that allows users to find and organise unique locations beyond mainstream tourist spots, giving travellers a more personalised and meaningful exploration experience. At the time, our team lacked the expertise to create working model. The idea has since been overtaken by a multitude of other travel apps, but it's nice to be able to attempt it now. 

## Features

- **User Authentication**: Sign up, log in, and manage your account.
- **Category Management**: Create, update, and delete custom categories.
- **Point of Interest Management**: Add POIs to categories with descriptions and coordinates.
- **Bulma-Based UI**: A clean and responsive interface using the Bulma CSS framework.
- **MongoDB Integration (Upcoming)**: The app currently uses JSON-based storage but will transition to MongoDB.
- **Future Enhancements**:
  - Image uploads for POIs
  - Interactive maps
  - Community-driven POI sharing

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (if using the database in the future)

### Steps

1. **Clone the repository**:
   ```sh
   git clone https://github.com/YOUR-USERNAME/Wanderly.git
   cd Wanderly
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following (MongoDB integration is optional for now):
     ```ini
     PORT=3000
     SESSION_SECRET=your_random_secret_here
     COOKIE_PASSWORD=your_secure_random_password
     # MONGO_
     ```
4. **Start the application**:
   ```sh
   npm start
   ```
to start in Dev mode
   ```sh
   npm run dev 
   ```

## Technology Stack

- **Backend**: Node.js, Hapi.js
- **Frontend**: Handlebars, Bulma
- **Database**: JSON (MongoDB coming soon)
- **Authentication**: Cookie-based sessions

## Roadmap

- Implement category & POI management
- UI improvements with Bulma
- Migrate to MongoDB
- Add interactive maps for POIs
- Enable image uploads

## Contribution



## Licence

