<p align="center">
  <img src="./web/public/logo.png" style="margin: 32px;" alt="IPlayed Logo" />
</p>

<p align="center">
  <b>IPlayed</b> is a modern and performant frontend application built to deliver a smooth and immersive game tracking experience. It focuses on usability, accessibility, and scalable UI architecture.
</p>
<p align="center">v0.0.1</p>

# 🎮 IPlayed Web

`IPlayed Web` is the frontend application for the IPlayed platform. It allows users to discover, track, review, and organize video games through a clean and responsive interface.

The project is built with a strong focus on `component reusability`, `design consistency`, and `type safety`, ensuring a high-quality user experience and long-term maintainability.

### ✨ Features

- User authentication and session handling
- Game discovery with external data integration
- Track game status (to play, playing, completed, abandoned)
- Create and edit game reviews and ratings
- Favorite games management
- Custom game lists
- Advanced filters, sorting, and pagination
- Responsive layout (mobile, tablet, desktop)
- Accessible and themeable UI components
- Skeletons, loading states, and empty states

### 🛠️ Tech Stack

- Framework – **Next.js (App Router)**
- Language – **TypeScript**
- Styling – **Tailwind CSS**
- UI Components – **shadcn/ui**
- Icons – **Lucide React**
- Forms & Validation – **React Hook Form + Zod**
- Data Fetching & Caching – **React Query**
- Linting & Formatting – **ESLint, Prettier**
- Tooling – **Pnpm**

## 🚀 Getting Started

### ☑️ Prerequisites

- Node.js (18+ recommended)
- Pnpm
- Backend API running (IPlayed API)

### 🧱 Architecture

The frontend follows a modular and scalable structure:

- **App Router** – routing, layouts, and server components
- **Components** – reusable UI and domain components
- **Features** – isolated feature-based modules
- **Hooks** – shared and feature-specific hooks
- **Services** – API communication and data fetching
- **Schemas** – Zod schemas for type-safe validation
- **Utils** – helpers, formatters, and shared logic
- **Styles** – global styles and Tailwind configuration

This structure encourages separation of concerns and makes the application easier to scale as new features are introduced.

### Installation

```bash
$ pnpm install
```
