import mongoose from 'mongoose';

const KilledMonsters = new mongoose.Schema(
  {
    user: {
      type: Number,
      required: true,
    },
    monster: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('KilledMonsters', KilledMonsters);
