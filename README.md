# Elevation Esports Website

A futuristic esports website built with Next.js for showcasing a university gaming community, its teams, tournaments, sponsors, and contact channels.

## Overview

This project is a cyberpunk-styled frontend with animated sections, glowing UI elements, and a dedicated tournament hub. It is designed as a polished showcase site for an esports brand called **Elevation Esports**.

## Features

- Landing page with hero, about, teams, sponsors, contact, and footer sections
- Dedicated **Tournament Hub** page
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

## Pages

- `/` : Main website landing page
- `/tournament-hub` : Tournament hub with game cards and tournament lists

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    tournament-hub/
      layout.tsx
      page.tsx
  components/
    sections/
    tournament/
    ui/
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

## Available Scripts

- `npm run dev` : Start the local development server
- `npm run build` : Create a production build
- `npm run start` : Start the production server
- `npm run lint` : Run ESLint

## Design Notes

- Uses a neon cyberpunk visual system with custom glow effects
- Includes animated logo treatment and motion-based hero elements
- Built around reusable UI primitives such as cards, buttons, inputs, and section headers

## Current Status

This is currently a frontend-focused project. Some actions use sample data or placeholder links, especially inside the tournament hub and contact flow.

## Future Improvements

- Connect tournament entries to real data
- Add working registration and details pages
- Hook up the contact form to a backend or email service
- Add authentication for admin or player features
- Filter tournament lists by selected game

## License

This project is available for personal, educational, or portfolio use unless you choose to add a different license.
