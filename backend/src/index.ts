import express, { Application } from 'express';
import arduinoRoutes from './routes/arduinoRoutes';
import recordRoutes from './routes/recordRoutes';

const app: Application = express();
app.use(express.json());

// Register Arduino routes
app.use('/arduinos', arduinoRoutes);

// Register Record routes
app.use('/records', recordRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
