import { fieldType } from "../genericShards.js";
import mongoose from "mongoose";

const address = new mongoose.Schema({
  state: { ...fieldType({ required: false }) },
  country: { ...fieldType({}) },
  city: { ...fieldType({}) },
  street: { ...fieldType({}) },
  houseNumber: { ...fieldType({ type: Number }) },
  zip: {
    ...fieldType({ type: Number, min: 10000, max: 9999999 }),
  },
});

export default address;
