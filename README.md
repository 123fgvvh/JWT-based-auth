# Mini Authentication System with JWT

This project is a simple authentication system built using **Node.js**, **Express**, **MongoDB**, and **JWT (JSON Web Tokens)**. It demonstrates how to implement secure user authentication with JWT and protect specific routes in a Node.js application. Users can sign up, log in, and access protected routes once authenticated.

## Features

- **User Sign Up**: Users can create an account with an email and password.
- **User Login**: Authenticated users can log in using their credentials to receive a JSON Web Token (JWT).
- **JWT Authentication**: JWT is issued upon successful login and stored in the user's cookies for authentication.
- **Protected Routes**: Certain routes are accessible only to authenticated users.
- **Middleware for Route Protection**:
  - `requireAuth`: Ensures that the user is logged in and restricts access to protected routes.
  - `checkUser`: Checks if a user is logged in and makes the user data available globally for dynamic content (like displaying "Welcome, [user email]").

## Technologies Used

- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for building the server.
- **MongoDB**: NoSQL database for storing user information.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Tokens)**: Used for secure, token-based user authentication.
- **Cookie Parser**: Middleware for parsing cookies to handle JWT stored in cookies.
- **EJS (Embedded JavaScript)**: Template engine for rendering dynamic HTML pages.

## Project Structure

```plaintext
.
├── models
│   └── User.js              # Mongoose model for user schema
├── middleware
│   ├── authMiddleware.js     # Authentication middleware (requireAuth, checkUser)
├── routes
│   └── authRoutes.js         # Authentication routes (login, signup, logout)
├── views
│   └── login.ejs             # EJS template for login page
│   └── signup.ejs            # EJS template for signup page
│   └── home.ejs              # EJS template for homepage
│   └── dashboard.ejs         # EJS template for user dashboard (protected)
├── public
│   └── styles.css            # Static CSS files for styling
├── app.js                    # Main application file
└── README.md                 # Project readme
```

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/123fgvvh/JWT-based-auth.git
   cd jwt-authentication-system
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   PORT=3001
   JWT_SECRET=your-secret-secret
   DB_URI=your_url
   ```

4. **Start the Application**

   ```bash
   npm start
   ```

   The server will be running at `http://localhost:3001`.

## Routes

- **GET /**: Home page.
- **GET /signup**: User sign-up page.
- **POST /signup**: Create a new user.
- **GET /login**: User login page.
- **POST /login**: Authenticate the user and issue a JWT.
- **GET /logout**: Log out the user by clearing the JWT cookie.
- **GET /dashboard**: A protected route, accessible only to logged-in users (requires JWT).

## Middleware

### 1. `requireAuth`
- Protects routes by ensuring that a valid JWT is present in the request cookies. Redirects unauthenticated users to the login page.

### 2. `checkUser`
- Checks if a valid JWT exists and retrieves user data to make it available in views. It doesn’t block access but helps personalize content for logged-in users (like showing a welcome message).

## Usage

1. **Sign Up**: Navigate to `/signup` to create a new user account.
2. **Log In**: After signing up, log in at `/login`. On successful login, a JWT is issued and stored in the cookies.
3. **Access Protected Routes**: Once logged in, navigate to `/dashboard`, which is a protected route. If the user is not authenticated, they will be redirected to the login page.

## License

This project is licensed under the MIT License
