import mongoose from "mongoose";
import { fieldType } from "../genericShards.js";

const name = new mongoose.Schema({
  first: { ...fieldType({}) },
  second: { ...fieldType({ required: false }) },
  last: { ...fieldType({}) },
});

export default name;
