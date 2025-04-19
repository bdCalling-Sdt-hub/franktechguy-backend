import mongoose from 'mongoose';
const vehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  vin: {
    type: String,
    required: true,
  },

  image: {
    type: String, // Assuming this is a URL or base64 string
  },
  status: {
    type: String,
    enum: ['Available', 'In Use'],
    default: 'Available',
  },
});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
