
import {User} from "../../models/User";
import mongoose from "mongoose";
import {isAdmin} from "@/app/api/isAdmin";

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}