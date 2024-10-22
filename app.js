const express=require("express");
const app=express();
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRouter');
const noteRoutes = require('./routes/noteRouter');


// Database Connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);



app.listen(3000, () => console.log(`Server running on port`));



