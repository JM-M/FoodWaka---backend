import mongoose from 'mongoose';

const verificationCodeSchema = mongoose.Schema(
  {
    code: {
    	type: Number,
    	required: true
    },
    _id: {
    	type: mongoose.Types.ObjectId,
    	required: true
    }
  },
  {
    timestamps: true,
  }
);


const VerificationCode = mongoose.model('VerificationCode', verificationCodeSchema);

export default VerificationCode;