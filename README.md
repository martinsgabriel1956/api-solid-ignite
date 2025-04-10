# API S.O.L.I.D. Ignite

## :computer: Technologies:

- TypeScript
- Prisma
- Fastify
- Node.js
- PostgreSQL
- Docker

## :construction_worker: Steps to use:

### Installation:

```bash
  # NPM/PNPM
  npm/pnpm i

  # Yarn
  yarn
```

### Setting .env file

```bash
   ## Get the environment variable of .env.example file and use it in .env file filling with your credentials

  cp .env.example .env
```

### Running the container

```bash
  docker-compose up

  ## Or

  docker compose up
```

### Running the database

```bash
  npx prisma migrate dev
```

### Running the application

```bash
  # NPM
  npm run start:dev

  # Yarn
  yarn start

  # PNPM
  pnpm start
```

## Requirements

### FRs (Functional requirements)

- [x] It should be possible to create a new user
- [x] It should be possible to authenticate an existing user
- [x] It should be possible to get the perfil of an logged user
- [x] It should be possible to get the number of check-ins of an logged user
- [x] It should be possible for the logged-in user to get your own check-ins history
- [x] It should be possible for the logged-in user to search for nearby gyms
- [x] It should be possible for the logged-in user to search gyms by name
- [x] It should be possible for the logged-in user to realize a check-in
- [x] It should be possible to validate a check-in of an existing user
- [x] It should be possible to register a new gym

### Business rules (BRs)

- [x] The user should not be able to register yourself with the same email
- [x] The user should not be able to do two check-ins in the same day
- [x] The user should not be able to do check-ins if he/she is not closer to the gym (100m)
- [ ] The check-in only be able to be validated until 20 minutes after the check-in was created.
- [ ] The check-in only be able to be validated by admin
- [ ] The Gym only be able to be registered by admin

### Non-functional requirements (NFRs)

- [x] The user password need to be encrypted
- [x] The application data need to be persisted in a PostgreSQL database
- [x] All data list need to be paginated with 20 items per page
- [ ] The user must be indicated by a JWT

## :memo: LICENSE

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details
