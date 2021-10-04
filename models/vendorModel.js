import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const vendorSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
    	type: String,
    	required: true
    },
    password: {
      type: String,
    },
    store: {
      type: mongoose.Types.ObjectId
    }
  },
  {
    timestamps: true,
  }
);

vendorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

vendorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;
