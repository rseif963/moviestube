require("dotenv").config();
var express = require("express");
var app = express();
var port = process.env.PORT || 4000; // use Vercel port if available
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', // later replace with your frontend vercel URL
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
require('./Connection/conn');

const AuthRoutes = require('./Routes/user');
const VideoRoutes = require('./Routes/video');
const CommentRoutes = require('./Routes/comment');

app.use('/auth', AuthRoutes);
app.use('/api', VideoRoutes);
app.use('/commentApi', CommentRoutes);

app.get("/", (req, res) => {
  res.send("API is running ");
});

app.listen(port, () => {
  console.log('Backend Project Running On Port ${port}');
});