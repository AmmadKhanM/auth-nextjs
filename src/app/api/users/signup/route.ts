import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModels';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody;
        
        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: 'User already exists'}, {status: 400});
        }

        // hash password 
        const salt = await bcryptjs.genSalt(10)
        const hashPassword= await bcryptjs.hash(password, salt);

        // create a new user
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        })

        //save a user in DB
        const savedUser = await newUser.save();
        console.log(savedUser);

        // After Saving user sent a response 
        return NextResponse.json({
            message: "user created successfully",
            success: true,
            savedUser

        })
        

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
};

connect()