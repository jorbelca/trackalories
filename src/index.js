import express from 'express'
import http from 'http'
import cors from 'cors'
import { json } from 'express'
import { MONGO, PORT } from '../configEnv.js';
import loginRouter from './routes/loginRoutes.js';
import registerRouter from './routes/registerRoutes.js';
import searchRouter from './routes/searchRoutes.js';

import saveRouter from './routes/saveRoutes.js';
import eliminateUserRouter from './routes/eliminateUserRoutes.js';
import mongoose from 'mongoose';
import session from 'express-session'

import MongoStore from 'connect-mongo'
import getDataRouter from './routes/getAllData.js';
import profileRouter from './routes/getProfileData.js';
import eliminateOpsRouter from './routes/eliminateOpsRouter.js';
import { cronoScraper } from './scraper/cronos.js';
import changeTimeRouter from './routes/changeTimeRoutes.js';




const app = express();
// app.use(express.static('dist'));
app.use(cors())
app.use(json())
app.use(express.urlencoded({ extended: true }))
app.use('/ping', (req, res) => { return res.status(200).send('PONG') })
app.use('/api/register', registerRouter)


const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
connectMDB()

// const sessionStore = new MongoStore({
//   mongoUrl: `${MONGO}`,
//   collectionName: 'sessions'
// })

// const oneDay = 1000 * 60 * 60 * 24;


// app.use(session({
//   cookie: { sameSite: 'none', maxAge: oneDay, secure: 'auto' },
//   name: 'smallCrawler',
//   secret: `${SECRET}`,
//   store: sessionStore,
//   saveUninitialized: false,
//   resave: false,
// }));



app.use('/api/login', loginRouter)
app.use('/api/search', searchRouter)

app.use('/api/save', saveRouter)
app.use('/api/eliminate-user', eliminateUserRouter)
app.use('/api/eliminate-operation', eliminateOpsRouter)
app.use('/api/data', getDataRouter)
app.use('/api/profile', profileRouter)
app.use('/api/change-time', changeTimeRouter)




function connectMDB() {
  // CONECTAR MONGODB
  try {
    mongoose.connect(`${MONGO}`, dbOptions);
    console.log('Connected To MongoDB')
  } catch (error) { console.log(error) }
}

// CREA SERVIDOR Y ARRANCA EL DAEMON QUE REALIZA LOS ESCRAPEOS PROGRAMADOS
http.createServer(app).listen(PORT, function () {
  console.log('Server listening on port ' + PORT);
  cronoScraper()

});

