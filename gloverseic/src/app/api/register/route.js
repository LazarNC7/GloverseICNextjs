import mongoose from "mongoose";
import {User} from "src/app/models/User";
import bcrypt from "bcrypt";

export async function POST(req){
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const pass = body.password;
    // if (!pass?.length || pass.length < 5) {
    //     //new Error('password must be al least 5 characters');
    //     return false;
    // }
    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);


    const createdUser = await User.create(body);
    return Response.json(createdUser);

}

// import mongoose from "mongoose";
// import { User } from "src/app/models/User";
// import bcrypt from "bcrypt";

// export async function POST(req, res) {
//     try {
//         const body = await req.json();
//         mongoose.connect(process.env.MONGO_URL);
        
//         if (body.registrationType === 'credentials') {
            
//             const pass = body.password;
//             if (!pass?.length || pass.length < 5) {
                
//                 return Response.json({ error: 'Password must be at least 5 characters' });
//             }
            
//             const notHashedPassword = pass;
//             const salt = bcrypt.genSaltSync(10);
//             body.password = bcrypt.hashSync(notHashedPassword, salt);
            
//             const createdUser = await User.create(body);
//             return res.status(201).json(createdUser); 
//         } else if (body.registrationType === 'google') {
        
//             const createdUser = await User.create({
//                 email: body.emailFromGoogle,
//                 googleId: body.googleId,
                
//             });
            
//             return Response.json(createdUser);
//         } else {
//             return Response.json({ error: 'Invalid registration type' });
//         }
//     } catch (error) {
//         console.error(error); 
//         return Response.json({ error: 'Internal server error' }); 
//     }
// }
