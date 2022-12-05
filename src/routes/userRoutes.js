import express from 'express';
import { verifyAdminUser } from './middlewares.js';
import { getUserById, getUsers, createUser, updateUser, deleteUserById, login } from '../services/userService.js';

const router = express.Router();

router
  .route('')
  .get(getUsers)
  .put(updateUser)
  .post(createUser)
  .delete(verifyAdminUser, deleteUserById);

router
  .route('/login')
  .post(login);

export default router;
