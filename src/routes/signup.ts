import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/request-validation';

const router = express.Router();

router.post(
    '/api/users/signup',
    [
        body('name')
            .isString().withMessage('Please Enter valid name')
            .notEmpty().withMessage('Please Enter your name'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email is already in use');
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const userjwt = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            process.env.JWT_KEY!
        );

        req.session = {
            jwt: userjwt,
        };

        res.status(201).send(user);
    }
);

export { router as signupRouter };