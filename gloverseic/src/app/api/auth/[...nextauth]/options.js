import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "/../../libs/mongoConnect";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import {User} from "/../app/models/User";
import bcrypt from "bcrypt";

export const authOptions = {
    secret:process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name:"credentials",

            credentials: {
                username: { label: "Username", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({email});
                const passwordOk = user && bcrypt.compareSync(password, user.password);

                if(passwordOk){
                    //document.write("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    return user;
                }

                return null;

            }
        })
    ],
    session: {
        strategy:"jwt",
    },
    pages: {
        signIn: "/login",
    },
};