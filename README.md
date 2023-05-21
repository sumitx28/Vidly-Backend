# Vidly Backend

Vidly is a movie rental service. This project contains the backend required to serve these services.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_CONNECTION_URL`

`JWT_SECRET_KEY`

## Run Locally

Clone the project

```bash
  git clone https://github.com/sumitx28/Vidly-Backend.git
```

Go to the project directory

```bash
  cd Vidly-Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## API Reference

#### Users

```http
  GET /api/me       -> Get Current User

  POST /api/users   -> Register New User
```

#### Authenticate

```http
  POST /api/auth    -> Authenticate A User
```

#### Genres

```http
  ### Public
  GET /api/genres
  GET /api/genres/:id

  ### Authentication Required
  POST /api/genres
  PUT /api/genres/:id

  ### Require Admin Privileges
  DELETE /api/genres/:id
```

#### Customers

```http
  ### Public
  GET /api/customers
  GET /api/customers/:id

  ### Authentication Required
  POST /api/customers
  PUT /api/customers/:id

  ### Require Admin Privileges
  DELETE /api/customers/:id
```

#### Movies

```http
  ### Public
  GET /api/movies
  GET /api/movies/:id

  ### Authentication Required
  POST /api/movies
  PUT /api/movies/:id

  ### Require Admin Privileges
  DELETE /api/movies/:id
```

#### Rentals

```http
  ### Public
  GET /api/rentals

  ### Authentication Required
  POST /api/rentals
```

## Key takeaways

- Project Setup with Node, Express, and MongoDB.
- Design and implementation of REST API.
- Importance of project structure and clean coding.
- Implementation of authentication and authorization.
- Utilization of middlewares.
- Database design and implementation.

In summary, the lessons learned include setting up projects using Node, Express, and MongoDB, understanding the structure and implementation of REST APIs, emphasizing project organization and clean coding practices, implementing authentication and authorization mechanisms, utilizing middlewares effectively, and gaining knowledge in database design and implementation.

## Tech Stack

<div align="center">
	<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png" alt="REST" title="REST"/></code>
	<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" alt="Git" title="Git"/></code>
	<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" alt="Postman" title="Postman"/></code>
	<code><img height="50" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/></code>
	<code><img height="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/></code>
	<code><img height="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
	<code><img height="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>
	<code><img height="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/></code>
</div>

## Feedback

If you have any feedback, please reach out to me at savaliyasumit717@gmail.com
