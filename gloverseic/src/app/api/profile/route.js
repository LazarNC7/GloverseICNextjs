
import {User} from "../../models/User";
import {UserInfo} from "../../models/UserInfo";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const {_id, name, image, ...otherUserInfo} = data;

  let filter = {};
  if (_id) {
    filter = {_id};
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = {email};
  }

  const user = await User.findOne(filter);
  await User.updateOne(filter, {name, image});
  await UserInfo.findOneAndUpdate({email:user.email}, otherUserInfo, {upsert:true});

  return Response.json(true);
}

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
  
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
  
    let filterUser = {};
    if (_id) {
      filterUser = { _id };
    } else {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;
      if (!email) {
        return Response.json({});
      }
      filterUser = { email };
    }
  
    try {
      const user = await User.findOne(filterUser).lean();
      if (!user) {
        return Response.json({});
      }
  
      const userInfo = await UserInfo.findOne({ email: user.email }).lean();
  
      // Assuming 'image' field in user object is the AWS S3 URL
      const userData = {
        ...user,
        ...userInfo,
        image: user.image, // Ensure 'image' field contains AWS S3 URL
      };
  
      return Response.json(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return Response.json({});
    }
  }