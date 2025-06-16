# My Movie List

A modern, responsive web application to browse, search, and discover movies. Built with React, Vite, Tailwind CSS, and the OMDb API, it features a Netflix/Amazon Prime-inspired UI, genre filtering, authentication UI, and more.

## Features

- **Top 5 Movies Row:** Displays five all-time greats in a horizontal scrollable row.
- **Genre Dropdown:** Select a genre to browse 14 random movies per page, with pagination.
- **Search:** Search for any movie by title, with instant results and details.
- **Movie Details:** Click any movie to view its poster, description, year, genre, and IMDb rating.
- **Authentication UI:** Login and Register buttons in the navbar (UI only).
- **Modern UI:** Responsive, dark-themed, and inspired by streaming platforms.
- **Footer:** Clean, modern footer with copyright.

## Technologies Used

- **React** (with functional components and hooks)
- **Vite** (for fast development and build)
- **Tailwind CSS** (utility-first styling)
- **OMDb API** (movie data and images)
- **React Router** (for navigation)
- **Git & GitHub** (version control)

## How to Run

1. Clone the repository:
   ```sh
   git clone https://github.com/Abhishekkumarpaswan/MyMovieList.git
   cd MyMovieList
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/components/` — Reusable UI components (Navbar, Footer, MovieCard, etc.)
- `src/assets/` — Images and static assets
- `src/App.jsx` — Main app logic and routing
- `src/index.css` — Tailwind and custom styles

## Difficulties Faced

- **OMDb API Limitations:** OMDb does not support direct genre filtering or trending endpoints, so genre browsing uses keyword-based search and may not be perfect.
- **Random Movie Selection:** True randomness is not possible with OMDb, so a rotating set of keywords is used to simulate variety.
- **Styling Consistency:** Achieving modern look with Tailwind required custom classes and careful layout tweaks.
- **Merge Conflicts:** Git history divergence required manual conflict resolution and configuration changes.
- **API Rate Limits:** OMDb's free tier has a daily request limit, so heavy usage may require a paid key.

## Credits

- [OMDb API](https://www.omdbapi.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)

---

Enjoy discovering movies with My Movie List!
