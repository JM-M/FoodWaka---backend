import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Vendor from '../models/vendorModel.js';
import Store from '../models/storeModel.js';
import VerificationCode from '../models/verificationCodeModel.js';

// @desc Authenticate vendor
// POST /api/vendors/login
// @access Public
const authVendor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ email });
  if (!vendor.password) {
    res.status(401);
    throw new Error('Verify your account');
  }
  if (vendor && (await vendor.matchPassword(password))) {
    const token = generateToken(vendor._id);
    res.cookie('authcookie', token, { maxAge: 900000, httpOnly: true });
    res.json({
      _id: vendor._id,
      fullName: vendor.fullName,
      email: vendor.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Get vendor using JWT from cookie
// GET /api/vendors/current
// @access Private
const getCurrentVendorDetails = asyncHandler(async (req, res) => {
  const { _id, fullName, email, store } = req.vendor;
  // console.log('in controller');
  res.json({
    _id,
    fullName,
    email,
    store
  });
});

// @desc Log a logged in vendor out
// POST /api/vendors/logout
// @access Private
const logVendorOut = asyncHandler(async (req, res) => {
  res.cookie('authcookie', '', { maxAge: 0, httpOnly: true });
  res.status(205);
  res.end('success');
});

const sendVerificationCode = async (_id) => {
	try {
		// generate random 6 digit number
		const code = 12345;
		// send the code via SMS
		await VerificationCode.create({ _id, code });
	} catch (error) {
		console.log(error);
    	throw new Error('Something went wrong');
	}
}

// @desc Register a new vendor
// POST /api/vendors
// @access Public
const registerVendor = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, fullName, phoneNumber, storeName, location, ...rest } = req.body;
  const vendorExists = await Vendor.findOne({ email });
  if (vendorExists) {
    res.status(400);
    throw new Error('Vendor already exists');
  }

  // create a store and add the store to the vendor created below
  const store = await Store.create({ name: storeName, location });

  const vendor = await Vendor.create({ email, fullName, phoneNumber });

  const { _id } = vendor;

  if (vendor) {
    // console.log(vendor);
    // send verification code
    await sendVerificationCode(_id);
    const token = generateToken(vendor._id);
    res.cookie('authcookie', token, { maxAge: 900000, httpOnly: true });
    res.status(201).json({ _id, fullName, email, phoneNumber });
  } else {
    res.status(400);
    throw new Error('Invalid vendor data');
  }
});

// @desc Confirm a vendor's verification code
// POST /api/vendors/verify
// @access Private
const confirmVerificationCode = asyncHandler(async (req, res) => {
	const { code, _id } = req.body;
	const correctCode = await VerificationCode.findById(_id);
	if (correctCode) {
    console.log(Number(code), Number(correctCode.code));
		if (Number(code) === Number(correctCode.code)) {
			res.status(200).end();
		} else {
			res.status(400);
			throw new Error('Incorrect code');
		}
	} else {
		res.status(400);
    	throw new Error('Invalid account');
	}
});

// @desc Resend a vendor's verification code
// POST /api/vendors/code
// @access Private
const resendVerificationCode = asyncHandler(async (req, res) => {
	const { _id } = req.body;
	try {
		await VerificationCode.findByIdAndDelete(_id);
		// send verification code
		await sendVerificationCode(_id);
		res.status(200).end();
	} catch (error) {
		  res.status(500);
    	throw new Error('Something went wrong');
	}
});

// @desc Confirm a vendor's verification code
// POST /api/vendors/password
// @access Private
const setPassword = asyncHandler(async (req, res) => {
  try {
    const { _id, password } = req.body;
    console.log({ _id, password });
    await Vendor.findOneAndUpdate({ _id }, { password });
    res.status(200).end();
  } catch (error) {
      res.status(500);
      throw new Error('Something went wrong');
  }
});

export {
  authVendor,
  // googleAuth,
  getCurrentVendorDetails,
  confirmVerificationCode,
  resendVerificationCode,
  setPassword,
  logVendorOut,
  registerVendor,
};
