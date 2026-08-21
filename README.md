# 🥟 Modak Cafe n Restaurant — Web Application

A modern, high-performance web experience for **Modak-Cafe n Restaurant** (Sanawad, MP), built with React, TypeScript, Tailwind CSS, and Formspree integration.

---

## ✨ Features

- **🏛️ "Artistic Flair" Editorial Aesthetics**: Warm neutrals (`#F8F7F3`, `#EAE8E2`), crisp 1px architectural hairline borders, deep ink typography (`#121212`), and balanced negative space.
- **📅 Table Reservation System**: Full table booking workflow capturing guest name, email, party size, reservation date, time slots, seating area preference (Indoor AC / Al Fresco Patio / Private Lounge), and special dietary requests.
- **🛍️ Interactive Menu & Order Drawer**: Category-filtered menu browser with live cart management, tax calculation, and order dispatch.
- **⭐ Verified Customer Reviews**: Dynamic reviews feed with star ratings and interactive review submission.
- **📬 Formspree Integration**: Connected endpoint (`https://formspree.io/f/xoearnob`) capturing submissions from table reservations, reviews, online orders, and newsletter subscribers.
- **📶 Amenities & Location**: Integrated Wi-Fi details modal, Google Maps directions, opening hours, and kitchen policies.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Form Backend**: Formspree

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY>.git
   cd <YOUR_REPOSITORY>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or the port specified in the terminal) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
├── public/                # Static assets
├── src/
│   ├── components/        # UI components (Navbar, Hero, MenuModal, ReservationModal, etc.)
│   ├── data/              # Menu items, review data, and configuration
│   ├── utils/             # Formspree endpoint helper
│   ├── types.ts           # TypeScript interfaces & types
│   ├── App.tsx            # Root application layout & state
│   ├── index.css          # Global styling & Tailwind directives
│   └── main.tsx           # Application entry point
├── metadata.json          # Applet metadata
├── package.json           # Dependencies & build scripts
└── README.md              # Project documentation
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
