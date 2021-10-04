import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		image: String,
		name: {
			type: Number,
			required: true
		},
		desc: String,
		variants: Array,
		options: Array,
		available: {
			type: Boolean,
			reqired: true
		}
	},
	{
		timestamps: true
	}
)

const storeSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		location: {
			type: String,
			required: true
		},
		product: [productSchema]
	},
  {
    timestamps: true,
  }
)

const Store = mongoose.model('Store', storeSchema);

export default Store;