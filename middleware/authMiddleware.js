import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Vendor from '../models/vendorModel.js';

const protectUser = asyncHandler(async (req, res, next) => {
  let authcookie;
  authcookie = req.cookies.authcookie;
  if (authcookie) {
    try {
      const decoded = jwt.verify(authcookie, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const protectVendor = asyncHandler(async (req, res, next) => {
  let authcookie;
  authcookie = req.cookies.authcookie;
  if (authcookie) {
    try {
      const decoded = jwt.verify(authcookie, process.env.JWT_SECRET);
      req.vendor = await Vendor.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protectUser, protectVendor };
