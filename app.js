import 'dotenv/config';
import express from 'express';
import chalk from 'chalk';
import connectToDb from './services/dbService.js';
import router from './routes/router.js';
import logRequests from './services/loggingService.js';
import mwCors from './middlewares/cors.js';

const PORT = process.env.PORT || 8181;

const app = express();
app.use(mwCors);
app.use(express.json());
app.use(logRequests());
app.use(express.static('./public'));

app.use(router);

// global error logging middleware
app.use((err, req, res, next) => {
  return console.log(chalk.red('[Server] ' + res));
});

app.listen(PORT, async () => {
  console.log(chalk.cyan(`[Server] Listening to port ${PORT}`));
  await connectToDb();
})