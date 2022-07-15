import { Schema, model } from 'mongoose';
import { Password } from '../services/password';

interface IUser {
  name: string;
  email: string;
  password: string;
}
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.Hash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

const User = model<IUser>('User', userSchema);

export { User };
