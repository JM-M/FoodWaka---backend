import express from 'express';
import {
  authUser,
  // googleAuth,
  getCurrentUserDetails,
  confirmVerificationCode,
  resendVerificationCode,
  setPassword,
  logUserOut,
  registerUser,
} from '../controllers/userController.js';
import { protectUser } from '../middleware/authMiddleware.js';
// import * as validator from 'express-validator';

// const { check, validationResult } = validator;

const router = express.Router();

router.route('/').post(registerUser);
router.route('/current').get(protectUser, getCurrentUserDetails);
// router.post('/google-auth', googleAuth);
router.post('/login', authUser);
router.route('/verify').post(protectUser, confirmVerificationCode);
router.route('/resend-code').post(protectUser, resendVerificationCode);
router.route('/password').post(protectUser, setPassword);
router.route('/logout').post(protectUser, logUserOut);

export default router;
