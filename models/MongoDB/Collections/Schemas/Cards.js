import mongoose from "mongoose";
import {
  dateType,
  fieldType,
  repetitiveObjects,
} from "../schemaShards/genericShards.js";

const repObjects = await repetitiveObjects({});

const CardsSchema = new mongoose.Schema({
  title: { ...fieldType },
  subtitle: { ...fieldType },
  description: { ...fieldType({ maxlength: 1024 }) },
  ...repObjects,
  bizNumber: {
    ...fieldType({
      type: Number,
      minlength: 7,
      maxlength: 7,
      max: 9999999,
      required: false,
    }),
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: [String],
  createdAt: dateType,
  web: { ...fieldType({ minlength: 14 }) },
});

const Card = mongoose.model("cards", CardsSchema);

export default Card;
