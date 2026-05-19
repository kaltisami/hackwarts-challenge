# hackwarts-challenge

Backend submission for the Hackwarts hackathon challenge. A REST API built with Node.js, Express, and Prisma ORM.

## Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

`express` · `prisma` · `bcrypt` · `jsonwebtoken` · `nodemailer` · `helmet` · `cors`  
Dev: `jest` · `eslint` · `prettier` · `nodemon`

## Project Structure

```
backend/
├── app.js              # Entry point
├── prisma/             # Prisma schema and migrations
└── src/
    ├── controllers/    # Route handlers
    ├── middleware/     # Auth and validation middleware
    └── routes/         # API route definitions
```

## Getting Started

```bash
git clone https://github.com/kaltisami/hackwarts-challenge.git
cd hackwarts-challenge/backend
npm install
```

Set up your `.env`:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the server:

```bash
npm run dev
```

## Running Tests

```bash
npm test
```

## License

ISC
