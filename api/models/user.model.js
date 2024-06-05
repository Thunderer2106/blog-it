import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgithub.com%2Funknown-user-9246102101&psig=AOvVaw2BC_H-5S0QQ_FJivuy_zco&ust=1716902496360000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjh67j2rYYDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
