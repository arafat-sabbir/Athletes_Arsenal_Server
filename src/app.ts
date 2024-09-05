import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import allRoutes from './app/routes/index';
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Middleware to log requests and responses
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  const url = req.url;
  const query = JSON.stringify(req.query, null, 2);
  const params = JSON.stringify(req.params, null, 2);
  const formattedDate = formatDate(new Date());
  // Override res.send to capture the response data
  console.log('------------------------');
  console.log(
    `Api :- \x1b[0m\x1b[34m${method}\x1b[0m \x1b[32m${url}\x1b[0m \x1b[36m[${formattedDate}]\x1b[0m`
  );
  console.log('------------------------');
  next();
};

app.use(express.json());
app.use(
  cors({
    origin: ['https://athletes-arsenal.vercel.app', 'http://localhost:5173'],
    credentials: true,
  })
);

app.use(requestLogger);

// use All The Routes From Routes
app.use('/api/v1', allRoutes);
const test = (req: Request, res: Response) => {
  res.send('Hello NewBie!');
};
app.get('/', test);
app.use(globalErrorHandler);
app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route Is Not Found ${req.url}` });
});

export default app;
