# BLOG-IT

This full stack webapp enables users to explore the blogs they wish to read and also chat with blogs for immediate and structured responses. admins of the application are allowed to manage posts,comments,users and also upgrade or demote users.
-The deployed version of site : https://blog-it-1.onrender.com/

## Features

### 1. **Role based access control**

-Secure both the client and backend for specific pages, like the admin dashboard.
-Admins gain the ability to effortlessly manage posts, comments, and users, complete with CRUD operations using the MongoDB

### 2. \*_Roles_

- User
- Admin

### 3. **Responsive Design**

- The website is meticulously designed to be completely responsive, ensuring a seamless experience across various devices.
- Plus, I've added a sleek dark mode to enhance user experience and cater to different preferences

### 4. **OAuth and JWT based auth**

- Implemented authentication via both Google Oauth provider and JWT based token.

## Admin credential

```bash
  "email":admin@gmail.com,
  "password": "admin@2004"

```
# Steps to Run the Project

## Clone the Repository
```bash
git clone https://github.com/Thunderer2106/blog-it
```
## config(.env)
```bash
VITE_FIREBASE_API_KEY=""
OPEN_AI_KEY=""
```
## run server
```bash
npm run dev
```
## run client
```bash
cd client
npm run dev
```

## Routes:

### Common Routes:

- **/dashboard?tab=profile**: Allows modification of user data.
  [![img](/images/profileupdation.png)]
- **GET /products/:id**: Retrieves product details with caching for improved performance.
- **GET /products**: Lists all products for a specific user with optional filters.
