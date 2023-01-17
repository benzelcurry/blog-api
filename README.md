Blog REST API CRUD app built with an Express back end server and a React front end client.

Technologies
* MERN stack
* Express server
* React front ends
* MongoDB
* Mongoose
* JWT authentication
* bcryptjs password hashing
* Helmet middleware (for advanced security)

Features
* Two separate React front ends; one for regular users and one for admins
* Both front ends are responsive on mobile
* Persistent user log-in verification
* Back end and front end form sanitization and verification
* Ability to create accounts
  - Prevents duplicate usernames
* Ability to create blog posts (restricted to admins)
* Ability to update posts (restricted to admins)
* Ability to write comments on blog posts
* Ability to delete posts and comments (restricted to admins)