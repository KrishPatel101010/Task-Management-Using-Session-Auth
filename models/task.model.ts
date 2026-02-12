import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["Pending", "In-Progress", "Completed"],
    default: "Pending",
    required: true,
  },
  dueDate: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Task = model("Tasks", TaskSchema);
