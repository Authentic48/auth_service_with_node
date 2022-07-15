import express, { Request, Response } from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { NotFoundError } from '../errors/not-found-error';
import { User } from '../models/user';

const router = express.Router();

router.delete(
  '/api/users/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError();
    }

    if (req.currentUser!.id !== user.id) {
      throw new NotAuthorizedError();
    }

    user.remove();

    res.status(204).send({});
  }
);

export { router as deleteUserRouter };
