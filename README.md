# ⚡ JustRemind (Local Reminder App)

A fast, lightweight, offline-first Progressive Web Application (PWA) designed to handle quick daily reminders, temporary tasks, and small recurring routines without cluttering primary calendar tools like Google Calendar.

Built with performance, privacy, and accessibility in mind, all data is stored entirely on your device. Zero remote servers, zero cloud syncing, and zero internet connection required after initial load.

## ✨ Core Features

* **100% Offline-First:** Powered by Service Workers and Workbox, the app loads instantly without an internet connection.
* **Privacy by Default:** No databases or backends. Your tasks live strictly in your browser's local IndexedDB.
* **Native Web Notifications:** Utilizes the browser's Notification API to alert you when tasks are due, even if you are working in another tab.
* **Installable PWA:** Can be installed directly to your desktop or mobile home screen as a standalone application.
* **Zero-Dependency UI:** Built using pure CSS Modules and CSS variables—no heavy component libraries (like Tailwind or Material UI) to ensure a lightning-fast Core Web Vitals profile.
* **Fully Accessible:** Adheres to strict WCAG 2.2 AA standards, including proper focus states, ARIA labels, and minimum touch target sizes.

## 🛠 Tech Stack

* **Framework:** React + TypeScript
* **Build Tool:** Vite
* **Package Manager:** pnpm
* **State Management / Forms:** React Hook Form
* **Local Database:** Dexie.js (IndexedDB wrapper) + `dexie-react-hooks`
* **PWA Engine:** `vite-plugin-pwa` (Workbox)
* **Styling:** Pure CSS (CSS Modules + Global Design Tokens)

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/ankurdas1998/JustRemind.git
cd JustRemind

```


2. **Install dependencies:**
```bash
pnpm install

```


3. **Start the development server:**
```bash
pnpm dev

```


*The app will be available at `http://localhost:5173`.*

## 🏗 Building & Testing the PWA Locally

To test Service Workers, offline caching, and background notifications, you must test the production build. Vite's local dev server does not register service workers.

1. **Build the production assets:**
```bash
pnpm build

```


2. **Run the local preview server:**
```bash
pnpm preview

```


*Open `http://localhost:4173` in your browser. You can now test offline mode via the Network tab in DevTools, and click the install icon in your address bar.*

## 🌐 Deployment (GitHub Pages)

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

1. Go to your repository **Settings** > **Pages**.
2. Under **Build and deployment**, set the Source to **GitHub Actions**.
3. Push any changes to the `main` branch.
4. The `.github/workflows/deploy.yml` workflow will automatically build the app and publish it to your GitHub Pages URL.

*(Note: Ensure the `base` property in `vite.config.ts` matches your repository name if not using a custom domain).*

## 📁 Project Structure

```text
src/
├── assets/            # Static assets and icons
├── components/        # UI Components (Forms, Lists, Layout)
│   ├── Layout/        # Main app shell
│   ├── NotificationBanner/ # PWA Permission UI
│   ├── TaskForm/      # React Hook Form implementation
│   └── TaskList/      # Task rendering and interactions
├── db/                # Dexie.js IndexedDB configuration
├── hooks/             # Custom React Hooks (useTasks, useNotificationEngine)
├── styles/            # Global CSS variables and resets (theme.css)
├── types/             # Global TypeScript interfaces
├── App.tsx            # Root application component
└── main.tsx           # Entry point & Service Worker registration

```

## 🤝 Contributing

This is a personal hobby project, but suggestions, issues, and pull requests are always welcome! If you're adding UI elements, please stick to the strict "Pure CSS" constraint to keep the bundle size minimal.

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).