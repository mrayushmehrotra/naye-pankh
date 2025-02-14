// get the Google auth token and store the User in the Database
// use prisma for migration thing and use mongodb
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prismaClient } from "@/db/index";
import jwt from "jsonwebtoken";
interface GoogleTokenResult {
  email: string;
  email_verified: string;
  given_name: string;
  family_name?: string;
  picture?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token)
      return NextResponse.json(
        { error: "Token is required." },
        { status: 400 },
      );

    // Verify token with Google
    const googleOauthURL = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
    const { data } = await axios.get<GoogleTokenResult>(googleOauthURL);

    if (!data.email_verified) {
      return NextResponse.json(
        { error: "Email not verified by Google." },
        { status: 403 },
      );
    }

    // Check if user exists in DB
    let user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    // If user doesn't exist, create one
    if (!user) {
      user = await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name || "",
          profileImageURL: data.picture || "",
        },
      });
    }

    // Generate JWT Token
    const userToken = jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    console.log(user);
    return NextResponse.json({ token: userToken, user }, { status: 200 });
  } catch (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.json(
      { error: "Failed to verify Google token." },
      { status: 500 },
    );
  }
}
