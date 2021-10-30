import { Schema, model } from "mongoose";
//mongoose schema for user posts
//post contains user,desc,img(optional), likes attributes
const PostSchema = new Schema(
  {

    userId: {
      type: String,
      required: true,

    },

    desc: {

      type: String,
      max: 500,

    },

    img: {

      type: String,

    },

    likes: {

      type: Array,

      default: [],

    },
  },


  { timestamps: true }


);

export default model("Post", PostSchema);
