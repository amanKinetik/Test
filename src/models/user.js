import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';

const { Schema } = mongoose;

export const validUserTypes = {
  ADMIN: 'admin',
  STANDARD: 'standard',
};

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
    default: uuid.v4(),
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  userType: {
    type: String,
    required: true,
    default: validUserTypes.STANDARD,
    enum: Object.values(validUserTypes),
  },
  password: {
    type: String,
    required: true
  },
  favTeam: {
    type: String
  },
  score: {
    type: Number
  }
})

UserSchema.plugin(mongooseUniqueValidator);

UserSchema.pre('save', async function (next) {
  const { password } = this;
  console.log(this);
  if (password) {
    const passwordHash = bcrypt.hashSync(password, 10);
    this.password = passwordHash;
  };
  next();
})

const userModel = mongoose.model('user', UserSchema);
export default userModel;
