import { InferSchemaType, model, Schema } from "mongoose";

const roleSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export type Role = InferSchemaType<typeof roleSchema>;
export const RoleModel = model("Role", roleSchema);
