# Getting Started

This project provides a form submission API with the following functionalities:

- Server-side validation and sanitization of form input
- MongoDB Atlas as Database without using its typeORM 'mongoose'
- Modular, clean, and well-documented code for easy understanding and future expansion

## Clone the repository 

```bash
git clone https://github.com/Kislaykonvict/assignment.git
cd assignment
```

## Install dependencies

```bash
npm install
```

## Configure .env file:

- Rename .env.example to .env
- Change the port, host or mongoDb atlas URI accordingly.

## Set up MongoDB Atlas:

- Create a MongoDB Atlas cluster.
- Allow your IP address in the database access settings.

## Run the project:

```bash
node server.js
```
