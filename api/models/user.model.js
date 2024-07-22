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
        // "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgithub.com%2Funknown-user-9246102101&psig=AOvVaw2BC_H-5S0QQ_FJivuy_zco&ust=1716902496360000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjh67j2rYYDFQAAAAAdAAAAABAE",
        "https://th.bing.com/th/id/OIP.bm7TccU0tAU5LUAVvLLcsAAAAA?w=117&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
