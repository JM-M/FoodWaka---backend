import express from 'express';
import {
  authVendor,
  // googleAuth,
  getCurrentVendorDetails,
  confirmVerificationCode,
  resendVerificationCode,
  setPassword,
  logVendorOut,
  registerVendor,
} from '../controllers/vendorController.js';
import { protectVendor } from '../middleware/authMiddleware.js';
// import * as validator from 'express-validator';

// const { check, validationResult } = validator;

const router = express.Router();

router.route('/').post(registerVendor);
router.route('/current').get(protectVendor, getCurrentVendorDetails);
// router.post('/google-auth', googleAuth);
router.post('/login', authVendor);
router.route('/verify').post(protectVendor, confirmVerificationCode);
router.route('/resend-code').post(protectVendor, resendVerificationCode);
router.route('/password').post(protectVendor, setPassword);
router.route('/logout').post(protectVendor, logVendorOut);

export default router;
