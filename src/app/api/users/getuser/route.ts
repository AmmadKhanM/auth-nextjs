import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModels';
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);        
        const user = await User.findOne({_id: userId.id}).select("-password");
        return NextResponse.json({
            message: 'User found',
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
};