import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';

        // Now we decode the token 
        const decodeToken: any = jwt.verify(token, process.env.TOKEN_SECRET!) 

        return decodeToken;
    } catch (error: any) {
        throw new Error(error.message)
    }
}