import express from 'express';
import { PORT } from './config/config';
import router from './routes/routes';

const app = express();


app.use(express.json())


app.get('/ping', (_, res) => {
  res.send('pong');
});

app.use('/api/', router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});