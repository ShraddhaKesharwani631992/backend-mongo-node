import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // from cloudenary or aws or
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    videoOwner: {
      type: Schema.Types.ObjectId, // who has uploaded the video
      ref: "User",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    views: { type: Number, default: 0 },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = model("Video", videoSchema);
