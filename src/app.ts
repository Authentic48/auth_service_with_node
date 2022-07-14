import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';

const app = express();
app.set('trust proxy', true);
app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

// Routes
app.use(signupRouter)
app.use(signinRouter)


// Fallback routes error 
app.all('*', async () => {
  throw new NotFoundError();
});

// Error handler middleware
app.use(errorHandler);

export { app };
