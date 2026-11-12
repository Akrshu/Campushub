# ✨ Campus Hub

### One Platform. Every Campus Need.

<p align="center">
  A smart digital ecosystem built to connect students, simplify campus life, and bring the entire college community together.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-In%20Development-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

---

## 🌐 About the Project

**Campus Hub** is an all-in-one student-focused digital platform that aims to transform the way students interact, communicate, collaborate, and exchange resources within their college communities.

Inspired by the convenience of platforms like Instagram, WhatsApp, LinkedIn, and OLX, Campus Hub brings essential campus activities into one unified ecosystem.

From connecting with fellow students to buying and selling second-hand products, sharing academic resources, and discovering hackathons — everything is designed around student needs.

## 💡 The Problem

Students often rely on multiple disconnected platforms for everyday campus activities.

- Finding and connecting with fellow students.
- Sharing academic resources and notes.
- Communicating with classmates.
- Buying and selling used products.
- Discovering hackathons, workshops, and events.
- Staying updated with campus activities.

**Campus Hub aims to bring these experiences together in one place.**

## 🚀 Key Features

| Feature | Description |
|---|---|
| 🔐 Authentication | Secure registration and JWT-based login |
| 👤 Student Profiles | Personalized profiles and student networking |
| 📰 Social Feed | Create posts, like, comment, and save |
| 💬 Messaging | Conversation-based chat system |
| 🔔 Notifications | Activity notifications for likes, comments, and follows |
| 🤝 Follow System | Follow and connect with other students |
| 🛍️ Marketplace | Campus-focused buying and selling |
| 📚 Notes & Resources | Academic material sharing |
| 🎯 Events & Hackathons | Discover opportunities and collaborate |

*Some modules are planned for future development.*

## 🛠️ Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Socket.IO

**Frontend (Planned / In Development)**
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios
- Socket.IO Client

**Development Tools**
- Git & GitHub
- Postman
- Visual Studio Code

## 🏗️ Project Structure

```text
CAMPUS-HUB/
│
├── client/                 # React frontend
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── socket/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── index.js
│   │
│   ├── package.json
│   └── .env
│
├── docs/
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd CAMPUS-HUB
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the exact environment variable names expected by your backend configuration.

### 4. Start the Backend

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### 5. Frontend

The React frontend will be added under the `client` directory as development progresses.

## 🗺️ Development Roadmap

- [x] Backend project setup
- [x] JWT authentication
- [x] User profile APIs
- [x] Posts, likes, and comments
- [x] Follow and unfollow system
- [x] Saved posts
- [x] Notification APIs
- [x] Chat REST APIs
- [x] Initial Socket.IO server setup
- [ ] Complete real-time messaging integration
- [ ] Online/offline presence and typing indicators
- [ ] React frontend
- [ ] Campus marketplace
- [ ] Wishlist and order management
- [ ] Payment gateway integration
- [ ] Notes and academic resources
- [ ] Events and hackathon discovery
- [ ] Admin dashboard
- [ ] Deployment

## 🔮 Future Vision

Campus Hub aims to evolve into a complete digital campus ecosystem with:

- 💳 Secure online payments and order management.
- 🤖 AI-powered student and product recommendations.
- 🏷️ Smart campus marketplace.
- 📍 Lost and Found assistance.
- 👥 Hackathon team formation.
- 📖 Academic resource sharing.
- 🎓 Campus event discovery.

## 🔒 Security & Privacy

Security is an important part of Campus Hub's development.

- JWT-based authentication.
- Protected API routes.
- Environment-based configuration.
- Secure handling of user information.
- Planned role-based access control and additional security measures.

## 🎯 Project Goal

To create a unified digital space where students can connect, communicate, collaborate, learn, and make campus life easier.

**Campus Hub is more than a social platform. It's an ecosystem built around student life.**

---

<p align="center">
  Made with ❤️ and ☕ for the student community.
  <br/>
  <b>Campus Hub — One Platform. Every Campus Need.</b>
</p>
