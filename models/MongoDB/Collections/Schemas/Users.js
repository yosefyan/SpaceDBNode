import mongoose from "mongoose";
import { name } from "../schemaShards/customShards/index.js";
import {
  booleanType,
  dateType,
  regexField,
} from "../schemaShards/genericShards.js";
import { repetitiveObjects } from "../schemaShards/genericShards.js";
import { phoneRegex } from "../../../../helpers/regexTypes.js";

const repObjects = await repetitiveObjects({
  emailUnique: true,
  shouldPassword: true,
});

const UserSchema = new mongoose.Schema({
  name,
  phone: { ...regexField({ minlength: 9, maxlength: 11 }, phoneRegex) },
  ...repObjects,
  isBusiness: booleanType,
  isAdmin: booleanType,
  createdAt: dateType,
});

const User = mongoose.model("users", UserSchema);

const userSchemaWithoutPasswordRequired = new mongoose.Schema(UserSchema);
userSchemaWithoutPasswordRequired.path("password").required(false);

const UserWithoutPasswordUnique = mongoose.model(
  "authusers",
  userSchemaWithoutPasswordRequired
);

export default User;
export { UserWithoutPasswordUnique };
