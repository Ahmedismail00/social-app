import express,{Application, RequestHandler,ErrorRequestHandler} from 'express';
import dotenv from 'dotenv';
import {initDb} from './datastore';
import mongoose from 'mongoose';
import config from './config/config';
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import {requestLoggerMiddleware,errHandler} from './middlewares';
import router from "./routes";
// initDb()
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
      console.log(`Running on ENV = ${process.env.NODE_ENV}`);
      console.log('Connected to mongoDB.');
      
      startServer();
  })
  .catch((error) => {
      console.log('Unable to connect.');
      console.log(error);
      process.exit(1);
});

const startServer = async ()=>{
  // init database object
  initDb();
  
  const app: Application = express();
  
  // Helmet is used to secure this app by configuring the http-header
  app.use(helmet());

  // compression is used to compresss res
  app.use(compression());
  
  // cors prevents other websites or domains from accessing your web resources directly from the browser.
  app.use(cors())
  
  // parse url encoded request body
  app.use(express.json());
  
  app.use(requestLoggerMiddleware);
  
  // routes
  app.use(router)
  
  app.use(errHandler)
  
  app.listen(process.env.APP_PORT || 3000); 
}
