we send the jsonwebtoken with the cookie named "jwt"
------------------------------------------------------------------------------------------------------
In a way, you can think of **`requireAuth`** as a **subset** of **`checkUser`**, but they have different roles and are used for different purposes in your application.

### Breakdown:

- **`checkUser`**:
  - **Purpose**: Checks if the user is logged in and makes the user data available (globally) for views or routes. It doesn’t **block** access to routes.
  - **Usage**: Used on **every route** (public and private) to check if the user is logged in and personalize content accordingly.
  
- **`requireAuth`**:
  - **Purpose**: Specifically ensures the user is logged in before giving access to **protected routes** (like a dashboard or profile page).
  - **Usage**: Used only on **protected routes** where you want to **restrict** access to logged-in users. If the user is not logged in, they are redirected to the login page.

### Key Differences:
- **`checkUser`** runs on all routes and doesn’t prevent access. It just checks if a user exists and makes their data available to customize the experience.
- **`requireAuth`** is more strict. It’s used on specific routes and actually **blocks access** if the user is not logged in.

### Can `requireAuth` be a Subset of `checkUser`?
You can think of **`requireAuth`** as a specialized version of `checkUser` for protected routes. Here's why:
- **`checkUser`** checks if the user is logged in and allows the user to proceed, whether logged in or not (just updates user info for personalization).
- **`requireAuth`** also checks if the user is logged in (similar to `checkUser`), but it goes a step further: **if they aren’t logged in, it stops them from accessing the page** and redirects them to the login.

### Why Both?
- **`checkUser`** gives you **flexibility** for general purposes like personalizing content on both public and private pages.
- **`requireAuth`** adds **extra security** by strictly **blocking** access to certain routes for non-logged-in users.

### Could You Merge Them?
In theory, you could create a combined middleware that does both things:
- **Check if the user is logged in** (like `checkUser` does).
- **Restrict access** to certain routes if the user is not logged in (like `requireAuth`).

However, by keeping them separate, you have more **granular control**:
- Use **`checkUser`** everywhere to track logged-in users.
- Use **`requireAuth`** only on **protected routes** where login is mandatory.

### Conclusion:
- **`requireAuth`** is not exactly a subset of **`checkUser`**, but it does depend on checking the user’s login status (just like `checkUser` does). It also adds an extra layer of protection by restricting access.
- Both serve **complementary roles**—one for checking and personalizing, the other for restricting and protecting.






