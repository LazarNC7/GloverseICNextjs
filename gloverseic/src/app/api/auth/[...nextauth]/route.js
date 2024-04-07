import  {getServerSession} from "next-auth";
import {User} from "/../app/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {UserInfo} from "../../../models/UserInfo";
import CredentialsProvider from "next-auth/providers/credentials";
import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "/../libs/mongoConnect";
import {authOptions} from "/../app/api/auth/[...nextauth]/options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }