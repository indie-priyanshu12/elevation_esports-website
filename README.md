# Elevation Esports Website

A futuristic esports website built with Next.js for showcasing a university gaming community, its teams, tournaments, sponsors, and contact channels.

## Overview

This project is a cyberpunk-styled frontend with animated sections, glowing UI elements, and a dedicated tournament hub. It is designed as a polished showcase site for an esports brand called **Elevation Esports**.

## Features

- Landing page with hero, about, teams, sponsors, contact, and footer sections
- Dedicated **Tournament Hub** page
- News feed and detailed news articles
- Admin Dashboard to manage news, tournaments, homepage data, and contact messages
- Game selection grid with branded game logos
- Sample **Upcoming** and **Completed** tournament listings
- Animated UI using `framer-motion`
- Custom neon theme built with Tailwind CSS v4
- Responsive layout for desktop and mobile

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React
- MongoDB
- Mongoose

## Pages

- `/` : Main website landing page
- `/tournament-hub` : Tournament hub with game cards and tournament lists
- `/news` : News feed and articles
- `/admin` : Admin dashboard for content management
- `/privacy-protocol`, `/rules-of-engagement`, `/terms-of-use` : Legal and information pages

## Project Structure

```text
src/
  app/
    admin/
    api/
    news/
    tournament-hub/
    layout.tsx
    page.tsx
  components/
    admin/
    news/
    sections/
    tournament/
    ui/
  lib/
    db/
    home/
    news/
    tournaments/
public/
  logo/
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser:

```text
http://localhost:3000
```

## Backend Setup

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Fill in your MongoDB connection string in `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/elevation_esports
```

3. Start the app:

```bash
npm run dev
```

On first backend access, the app will connect to MongoDB and use Mongoose models to manage `users`, `news_posts`, `tournaments`, and `uplink_messages`.

## Available Scripts

- `npm run dev` : Start the local development server
- `npm run build` : Create a production build
- `npm run start` : Start the production server
- `npm run lint` : Run ESLint

## API Endpoints

- `GET /api/tournaments` : Return tournament data
- `POST /api/tournaments` : Create a tournament
- `DELETE /api/tournaments/[slug]` : Delete a tournament
- `GET /api/news` : Return news data
- `POST /api/news` : Create a news post
- `DELETE /api/news/[slug]` : Delete a news post
- `POST /api/uplink` : Submit contact message
- `PATCH /api/uplink` : Update contact message read status
- `DELETE /api/uplink` : Delete a contact message

## Design Notes

- Uses a neon cyberpunk visual system with custom glow effects
- Includes animated logo treatment and motion-based hero elements
- Built around reusable UI primitives such as cards, buttons, inputs, and section headers

## Current Status

This project includes a backend foundation for MongoDB-backed data including Tournaments, News, and Contact messages (Uplink). An Admin Dashboard allows managing this data.

## Future Improvements

- Add working registration flows for tournaments
- Implement secure user authentication for the admin panel
- Filter tournament lists by selected game

## License

This project is available for personal, educational, or portfolio use unless you choose to add a different license.
