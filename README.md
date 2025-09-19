# Roomus Sandbox – Student Project

Welcome 👋  
This repository is a **sandbox** for redesigning and implementing the **Room Listings** feature of Roomus (our roommate-matching app). It is **disconnected from the real backend** – all data is mocked locally, so you can experiment safely.

---

## 🎯 Your Task

- **Main goal**: Build the **Room Listings section** of the app.
  - A page to browse available rooms.
  - A room detail page to see more info and “contact” (mocked).
  - Filtering, sorting, and pagination (or infinite scroll).
- **Expectations**
  - Clean, responsive UI (mobile + desktop).
  - Filters update the results and are reflected in the URL (so the page is shareable).
  - Code is well-structured, isolated, and easy to integrate later.
- **Encouraged**: If you have ideas for useful features (saved rooms, map view, roommate info, additional info for rooms, etc.), feel free to propose and implement them.

---

## 🗂 Project Structure

Here’s how the repo is organized:

```
src/
  api/              # API client + adapter (talks to mock API now, real API later)
    client.js   
    rooms.js

  features/
    listings/       # 🎯 Your main playground
      components/   # UI building blocks (RoomCard, FilterForm, etc.)
      pages/        # Page-level components (ListingsPage, RoomDetailPage)
      ...
  
  mocks/            # Mock Service Worker (MSW) setup
    fixtures/       # JSON files with fake data (rooms, etc.)
    handlers.js     # Mock endpoints (GET /rooms, etc.)
    browser.js      # MSW setup

  styles/           # Global styles (reset + variables)
    global.css

  App.jsx           # Root layout (header, <Outlet /> for pages)
  main.jsx          # App entry, router, MSW init
```

### Where you should work
- **`features/listings/`** → this is your home base.
  - Add/modify components and pages here.
  - Keep styles scoped (CSS Modules or prefixed classes).
- **`mocks/fixtures/rooms.json`** → you can add more fake rooms for testing.
- **`mocks/handlers.js`** → you may extend mock endpoints if you need new data fields.
- **✅ Do not touch:** `App.jsx`, `main.jsx`, `api/client.js`.

---

## 💡 What to Build

1. **Listings Page**
   - Grid/list of rooms (`RoomCard`).
   - Filters: city/neighborhood, budget range, room type, move-in date, amenities.
   - Sorting: newest, price ↑/↓.
   - Pagination or infinite scroll.
   - Empty + loading states.

2. **Room Detail Page**
   - Title, price, location, description.
   - Photos carousel (or placeholders).
   - Amenities list.
   - About roommates section.
   - “Contact” button (works via mock API).
   - Anything else you might come up with

3. **Extras (optional, encouraged)**
   - Save favorite rooms (localStorage).
   - Map preview of location.
   - Better roommate info display (interests, age, etc.).
   - UX polish (skeleton loaders, transitions).

---

## 🧑‍💻 Coding Guidelines

Please stick to these rules – they will make integration much easier later:

### General
- **No global CSS leaks**  
  - Use CSS Modules (`Component.module.css`) or prefix your classes with `.rm-...`.
- **Strict feature boundary**  
  - Keep all your code inside `features/listings/` unless agreed otherwise.
  - Expose only the routes/pages via an `index.js` (we’ll plug that into the main app).
- **Consistent file naming**  
  - Components: `PascalCase` → `RoomCard.jsx`.
  - Hooks: `useCamelCase.js`.
  - Styles: `Component.module.css`.

### API & Data
- Always use the functions in `api/rooms.js` (`searchRooms`, `getRoom`, `contactRoom`).  
  - Don’t `fetch` directly unless you’re adding new endpoints in mocks.
- Keep data shapes consistent with `rooms.json`.  
  - Example: budget is always a **string range** like `"€600-800"` (not a number).

### React/JS
- Functional components with hooks only (no class components).
- Keep components small and reusable.
- One component per file.
- No unused code or console logs in commits.

### Git & PRs
- Work on feature branches: `feature/room-card`, `feature/filters`, etc.
- Open PRs with:
  - Screenshot or GIF of what you built.
  - Short description of changes.
  - Note if you added new dependencies.

---

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173).
3. The mock API is automatically enabled via MSW.

---

## 📌 Notes

- You’re free to be creative – propose improvements or new features in your PRs.
- If you’re unsure about design, ask for feedback before coding.
- Don’t worry about connecting to the real backend – focus on UI/UX + clean structure.

---

