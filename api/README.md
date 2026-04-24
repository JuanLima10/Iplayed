<p align="center">
  <img src="../web/public/logo.png" style="margin: 32px;" alt="Iplayed Logo" />
</p>

<p align="center">
  <b>IPlayed</b> is a robust and well-structured backend API built to support a modern game tracking platform. Its architecture and tooling make it ideal for scaling, maintaining, and evolving over time while ensuring a clean developer experience.
</p>
<p align="center">v1.2.3</p>

# 🎮 IPlayed API

`IPlayed` is a backend API that allows users to track, review, and organize the video games they play. It supports game progress tracking, reviews, ratings, favorites, and custom game lists, all built with scalability and maintainability in mind.

The project focuses on `clean architecture`, `type safety`, and `reusable business logic`, making it easy to evolve with new features over time.

### ✨ Features

- User authentication via external providers
- Track game progress (to play, playing, completed, abandoned)
- Write and update game reviews
- Rate games and mark favorites
- Create and manage custom game lists
- Advanced filtering, sorting, and pagination
- Game popularity ranking
- External game data integration
- Fully documented API with Swagger

### 🛠️ Tech Stack

- Backend – Node.js, NestJS, TypeScript
- Database & ORM – PostgreSQL, Prisma ORM
- Validation & Documentation – Class validator, Class transformer, Swagger
- External Services – IGDB API, Tooling, Pnpm, ESLint, Prettier

## 🚀 Getting Started

### ☑️ Prerequisites

- Node.js (18+ recommended)
- PostgreSQL
- Pnpm

### 🧱 Architecture

The API follows a modular, layered architecture:

- Controllers – HTTP routing and request handling
- Services – business logic and orchestration
- DTOs – request and response validation
- Mappers – database → API response transformation
- Query Builders – reusable filtering, sorting, and pagination logic
- Utils – normalization, pagination, and shared helpers

### Installation

```bash
$ pnpm install
```

> Create a `.env` file based on `.env.exemple` & access `discord api docs` and `IGDB api docs` to complete the file correctly.

### Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## ❔ Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 📄 License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
