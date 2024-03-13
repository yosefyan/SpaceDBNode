import mongoose from "mongoose";
import { fieldType } from "../genericShards.js";

const image = new mongoose.Schema({
  url: { ...fieldType({ minlength: 14 }) },
  alt: { ...fieldType({}) },
});

export default image;
