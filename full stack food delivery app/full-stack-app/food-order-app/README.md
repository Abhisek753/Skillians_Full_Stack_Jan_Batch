# FoodieHub

FoodieHub is a beginner-friendly MERN stack food ordering app sample project.
This first class covers signup, login, password hashing, JWT generation, React routing, Auth Context, and Axios API calls.

## Structure

- `backend/` - Express API with MongoDB, Mongoose, JWT auth, and user signup/login.
- `frontend/` - React + Vite app with Tailwind CSS, React Router, Context API, and Axios.

## Generated folders

```text
food-order-app
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   └── routes
└── frontend
    └── src
        ├── components
        ├── contexts
        ├── pages
        └── services
```

## Get started

### Backend
1. Open `backend` folder.
2. Copy `.env.example` to `.env`.
3. Update `MONGO_URI` and `JWT_SECRET`.
4. Run:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

### Frontend
1. Open `frontend` folder.
2. Run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Notes
- Admin users should be created manually in MongoDB.
- Allowed roles are `customer` and `restaurant`.
