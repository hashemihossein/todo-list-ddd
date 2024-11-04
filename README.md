# Todo List DDD

A sophisticated Todo List application built with NestJS following Domain-Driven Design (DDD) principles, Command Query Responsibility Segregation (CQRS), and Event Sourcing patterns.

## Architecture

This project implements a clean architecture with clear separation of concerns:

### Domain Layer (`/src/todo/domain/`)

- Contains the core business logic and domain models
- Implements aggregate roots (`TodoList` and `TodoItem`)
- Defines domain events and value objects
- Uses factories for object creation
- Includes read models for query optimization

### Application Layer (`/src/todo/application/`)

- Implements CQRS pattern with separate command and query handlers
- Manages business operations through commands:
  - Create/Update/Delete Todo Lists
  - Create/Update/Delete Todo Items
- Handles domain events through event handlers
- Defines ports for infrastructure abstraction

### Infrastructure Layer (`/src/todo/infrastructure/`)

- Implements persistence using Event Sourcing with EventStoreDB
- Provides in-memory caching with Redis
- Includes Mongoose-based read models for query optimization
- Handles event serialization/deserialization

### Presentation Layer (`/src/todo/presenters/`)

- HTTP controllers for RESTful API endpoints
- DTO definitions for request/response mapping
- Event subscriptions for real-time updates

## Event Flow

1. Client sends HTTP request to controller
2. Command is dispatched to appropriate handler
3. Domain logic is executed, generating events
4. Events are stored in EventStoreDB
5. Subscriptions notify clients of changes
6. Clients publish events on local bus to update read models

## Key Features

- Event Sourcing implementation with EventStoreDB
- CQRS pattern with separate command and query handling
- In-memory caching with Redis
- Real-time updates through event subscriptions
- Robust domain model with aggregate roots
- Value objects for domain integrity
- Read models for optimized queries

## Technical Stack

- Framework: NestJS
- Event Store: EventStoreDB
- Caching: Redis
- Database: MongoDB with Mongoose
- Architecture: DDD, CQRS, Event Sourcing
- Language: TypeScript
- Package Manager: pnpm

## Project Structure

```
src/todo/
├── application/           # Application layer (Use cases)
│   ├── commands/         # Command definitions and handlers
│   ├── event-handlers/   # Domain event handlers
│   ├── ports/           # Repository interfaces
│   └── queries/         # Query definitions and handlers
├── domain/              # Domain layer (Core business logic)
│   ├── aggregate-root/  # Base aggregate implementation
│   ├── events/         # Domain events
│   ├── factories/      # Object factories
│   ├── read-models/    # Query optimization models
│   └── value-objects/  # Domain value objects
├── infrastructure/      # Infrastructure layer
│   ├── in-memory/      # Redis implementation
│   └── persistence/    # EventStoreDB and Mongoose implementations
└── presenters/         # Presentation layer
    ├── http/          # REST API controllers
    └── subscription/  # Event subscriptions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm
- Docker and Docker Compose

### Installation

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
pnpm install
```

3. Start required services

```bash
docker-compose up -d --build
```

The application will be available at:

- API: http://localhost:3003
- Swagger Documentation: http://localhost:3003/api

## API Documentation

Swagger documentation is available at `http://localhost:3003/api`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
