import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { currentUser } from './middlewares/current-user';
import { updateUserRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);


// Current user middleware
app.use(currentUser)

// Routes
app.use(signupRouter)
app.use(signinRouter)
app.use(updateUserRouter)


// Fallback routes error 
app.all('*', async () => {
  throw new NotFoundError();
});

// Error handler middleware
app.use(errorHandler);



export { app };
