import  {getServerSession} from "next-auth";
<<<<<<< HEAD
import {User} from "@/app/models/User";
=======
import {User} from "/../app/models/User";
>>>>>>> 1870973580709f1d312463a6f8393c0093d12199
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {UserInfo} from "../../../models/UserInfo";
import CredentialsProvider from "next-auth/providers/credentials";
import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
<<<<<<< HEAD
import clientPromise from "@/libs/mongoConnect";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
=======
import clientPromise from "/../libs/mongoConnect";
import {authOptions} from "/../app/api/auth/[...nextauth]/options";
>>>>>>> 1870973580709f1d312463a6f8393c0093d12199

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }