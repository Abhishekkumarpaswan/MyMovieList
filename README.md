# My Movie List 🎬

Welcome to My Movie List – your personal movie companion!  
Track what you’ve watched, what you’re planning to watch, discover new films, and manage your movie journey – inspired by the MyAnimeList experience, but for movie lovers.

## 🌟 Why contribute?

This project is built for the community, by the community. Whether you’re a developer, designer, or movie enthusiast, your contributions matter!  
**Help us build the best open-source movie tracker app together.**

---

## Features

- **User Accounts:** Register or log in, so your list is always with you.
- **Movie Statuses:** Mark movies as Watched, Planning to Watch, On Hold, or Dropped.
- **Top 5 Movies Row:** Displays five all-time greats in a horizontal scrollable row.
- **Genre Dropdown:** Select a genre to browse 14 random movies per page, with pagination.
- **Search:** Search for any movie by title, with instant results and details.
- **Movie Details:** Click any movie to view its poster, description, year, genre, and IMDb rating.
- **Modern UI:** Responsive, dark-themed, and inspired by streaming platforms.
- **Footer:** Clean, modern footer with copyright.

## Technologies Used

- **React** (with functional components and hooks)
- **Vite** (for fast development and build)
- **Tailwind CSS** (utility-first styling)
- **OMDb API** (movie data and images)
- **React Router** (for navigation)

---

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

---

## Project Structure

- `src/components/` — Reusable UI components (Navbar, Footer, MovieCard, etc.)
- `src/assets/` — Images and static assets
- `src/App.jsx` — Main app logic and routing
- `src/index.css` — Tailwind and custom styles

---

## How to Get Involved

1. **Read our [Contributing Guide](CONTRIBUTING.md)**

All skill levels are welcome. We’re excited to work with you!

---

## Difficulties Faced

- **OMDb API Limitations:** OMDb does not support direct genre filtering or trending endpoints, so genre browsing uses keyword-based search and may not be perfect.
- **Random Movie Selection:** True randomness is not possible with OMDb, so a rotating set of keywords is used to simulate variety.
- **Styling Consistency:** Achieving modern look with Tailwind required custom classes and careful layout tweaks.
- **Merge Conflicts:** Git history divergence required manual conflict resolution and configuration changes.
- **API Rate Limits:** OMDb's free tier has a daily request limit, so heavy usage may require a paid key.

---

## Credits

- [OMDb API](https://www.omdbapi.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)

---

Enjoy discovering movies with My Movie List, and happy contributing! 🚀

---

## 🌍 Read this in your language

<p align="center">
  <a href="README.en.md"><img src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/us.svg" alt="English" width="40"/></a>
  <a href="README.hi.md"><img src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/in.svg" alt="हिन्दी" width="40"/></a>
  <a href="README.fr.md"><img src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/fr.svg" alt="Français" width="40"/></a>
  <a href="README.es.md"><img src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/es.svg" alt="Español" width="40"/></a>
  <a href="README.de.md"><img src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/de.svg" alt="Deutsch" width="40"/></a>
</p>

<sub>
If you’d like to help translate this README into your language, feel free to contribute!
</sub>
