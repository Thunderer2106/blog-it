# BLOG-IT

This full stack webapp enables users to explore the blogs they wish to read and also chat with blogs for immediate and structured responses , like them too . admins of the application are allowed to manage posts,comments,users and also upgrade or demote users.
-The deployed version of site : https://blog-it-1.onrender.com/
## Admin credentials: 
-email-admin@gmail.com 
-password-admin@2004

## Features

### 1. **Role based access control**

-Secure both the client and backend for specific pages, like the admin dashboard.
-Admins gain the ability to effortlessly manage posts, comments, and users, complete with CRUD operations using the MongoDB

### 2. \*_Roles_

- User(read blogs,like them,comment them, also chat with them)
- Admin( can upgrade users,manage users,posts,comments)

### 3. **Responsive Design**

- The website is meticulously designed to be completely responsive, ensuring a seamless experience across various devices.
- Plus, I've added a sleek dark mode to enhance user experience and cater to different preferences

### 4. **OAuth and JWT based auth**

- Implemented authentication via both Google Oauth provider and JWT based token.

### 5. **Chatbot **

- Integrated a chat bot for every blog ,running based on its own context as template.

### 6. **Implemented search and filter**

- Enabled search and filters for all the blogs available based on name, category and sorting.

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

# Routes:

## User common routes :

- ### **/dashboard?tab=profile**: Allows modification of user data.
  ![img](/images/profileupdation.png)
- ### **/home**: contains recent blogs and description about the site.
  ![img](/images/blogs.png)
- ### **/search**: Allows user to search for posts with option of multiple filters.
  ![img](/images/searchandfilter.png)
- ### **/post/{postslug}**: Allows user to read blogs and comments.
  ![img](/images/blogwithcomments.png)
- ### **/chat/{postslug}**: Allows user to chat with blog.
  ![img](/images/chatbot.png)

## Admin routes:

- ### **/dashboard?tab=users**: Shows all the user data.
  ![img](/images/usermanagementby%20admin.png)
- ### **/dashboard?tab=posts**: Shows all the blogs data.
  ![img](/images/postmanagement.png)
- ### **/dashboard?tab=comments**: Shows all the comments data.
  ![img](/images/commentsmonitor.png)
- ### **/dashboard?tab=dashboard**: Shows all the tables.
  ![img](/images/admindashboard.png)
