import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },
    
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);
