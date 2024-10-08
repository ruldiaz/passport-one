const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./utils/connectDB');
const usersRouter = require('./router/user/usersRouter');
const passport = require('./utils/passport-local');
const cors = require('cors');
const cookieSession = require('cookie-session');

class Server {
  constructor(){
    this.app = express();
    this.loadEnvironment();
    this.configureMiddleware();
    this.configureRoutes();
    this.connectDatabase();
  }

  // Load environment variables
  loadEnvironment(){
    if (process.env.NODE_ENV === 'test') {
      dotenv.config({ path: '.env.test' });
    } else {
      dotenv.config();
    }
  }

  // Configure middlewares
  configureMiddleware(){
    const corsOptions = {
      origin: ['http://localhost:9000','http://localhost:5173'],
      credentials: true,
      methods: ['GET','POST', 'PUT'],
      allowHeaders: ['Content-Type','Authorization']
   }

   this.app.use(cors(corsOptions));
   this.app.use(cookieSession({
    name: 'app-auth',
    keys: ['secret-new','secret-old'],
    maxAge: 60 * 60 * 24
 }));

    this.app.use(express.json());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  // Configure routes
  configureRoutes(){
  // route handlers
    this.app.use('/api', usersRouter);
  }

  connectDatabase(){
    if (process.env.NODE_ENV !== 'test') {
      connectDB();
    } 
  }

  start(){
    const PORT = process.env.PORT || 3000;
    // Start the server if not in test environment
    if (process.env.NODE_ENV !== 'test') {
      this.app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
      });
    }
  }
}

 module.exports = Server;