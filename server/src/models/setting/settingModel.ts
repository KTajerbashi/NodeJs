import { InferSchemaType, model, Schema } from "mongoose";

const settingSchema = new Schema(
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
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export type Setting = InferSchemaType<typeof settingSchema>;
export const SettingModel = model("Setting", settingSchema);
