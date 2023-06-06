import './config/database';
import express, { Application } from 'express';
import cors from 'cors';
import arduinoRoutes from './routes/arduinoRoutes';
import recordRoutes from './routes/recordRoutes';


const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const { PORT } = process.env;

app.use('/arduino', arduinoRoutes);
app.use('/record', recordRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
