import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Password } from '../services/password';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/request-validation';
import { requireAuth } from '../middlewares/require-auth';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { NotFoundError } from '../errors/not-found-error';

const router = express.Router();

router.put(
  '/api/users/:id',
  requireAuth,
  [
    body('name')
            .isString().withMessage('Please Enter valid name')
            .notEmpty().withMessage('Please Enter your name'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be supplied'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError();
    }

    if(req.currentUser!.id !== user.id){
        throw new NotAuthorizedError()
    }

    user.set({ name, email, password })

    user.save();

    res.status(200).json(user);
  }
);

export { router as updateUserRouter };
