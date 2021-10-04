import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import VerificationCode from '../models/verificationCodeModel.js';
// import { OAuth2Client } from 'google-auth-library';
// import password from 'secure-random-password';

// @desc Authenticate user
// POST /api/users/google-auth
// @access Public
// const googleAuth = asyncHandler(async (req, res) => {
//   const { idToken } = req.body;
//   try {
//     const authRes = await client.verifyIdToken({
//       idToken,
//       audience:
//         '650776471346-h168qiuusu63m40o2npicpeamopdtm9o.apps.googleusercontent.com',
//     });
//     const { email_verified, fullName, email } = authRes.payload;
//     if (email_verified) {
//       const user = await User.findOne({ email });
//       if (user) {
//         const token = generateToken(user._id);
//         res.cookie('authcookie', token, { maxAge: 900000, httpOnly: true });
//         res.json({
//           _id: user._id,
//           fullName: user.fullName,
//           email: user.email,
//         });
//       } else {
//         const newPassword = password.randomPassword({ length: 10 });
//         const user = await User.create({
//           fullName,
//           email,
//           password: newPassword,
//         });
// 
//         if (user) {
//           console.log(user);
//           const token = generateToken(user._id);
//           res.cookie('authcookie', token, { maxAge: 900000, httpOnly: true });
//           res.status(201).json({
//             _id: user._id,
//             fullName: user.fullName,
//             email: user.email,
//             // token: token,
//           });
//         }
//       }
//     }
//   } catch (error) {
//     res.status(401);
//     throw new Error('Something went wrong');
//   }
// });

// @desc Authenticate user
// POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user.password) {
    res.status(401);
    throw new Error('Verify your account');
  }
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.cookie('authcookie', token, { maxAge: 900000, httpOnly: true });
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      // token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Get user using JWT from cookie
// GET /api/users/current
// @access Private
const getCurrentUserDetails = asyncHandler(async (req, res) => {
  const { _id, fullName, email } = req.user;
  // console.log('in controller');
  res.json({
    _id,
    fullName,
    email,
  });
});

// @desc Log a logged in user out
// POST /api/users/logout
// @access Private
const logUserOut = asyncHandler(async (req, res) => {
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

// @desc Register a new user
// POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, fullName, phoneNumber, ...rest } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ email, fullName, phoneNumber, ...rest });

  const { _id } = user;

  if (user) {
    console.log(user);
    // send verification code
    await sendVerificationCode(_id);
    const token = generateToken(user._id);
    res.cookie('authcookie', token, { maxAge: 900000, httpOnly: true });
    res.status(201).json({ _id, fullName, email, phoneNumber });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Confirm a user's verification code
// POST /api/users/verify
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

// @desc Resend a user's verification code
// POST /api/users/code
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

// @desc Confirm a user's verification code
// POST /api/users/password
// @access Private
const setPassword = asyncHandler(async (req, res) => {
  try {
    const { _id, password } = req.body;
    console.log({ _id, password });
    await User.findOneAndUpdate({ _id }, { password });
    res.status(200).end();
  } catch (error) {
      res.status(500);
      throw new Error('Something went wrong');
  }
});

export {
  authUser,
  // googleAuth,
  getCurrentUserDetails,
  confirmVerificationCode,
  resendVerificationCode,
  setPassword,
  logUserOut,
  registerUser,
};
