import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/db/index"; // Ensure correct path

// ✅ Create a new Campaign
export async function POST(req: NextRequest) {
  try {
    const { userId, title, description, goalAmount, imageUrl, category } =
      await req.json();

    if (!userId || !title || !description || !goalAmount || !category) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    // Create campaign in Prisma (MongoDB)
    const campaign = prismaClient.campaign.create({
      data: {
        userId,
        title,
        description,
        goalAmount,
        raisedAmount: 0, // Default raised amount
        imageUrl,
        category,
      },
    });

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign." },
      { status: 500 },
    );
  }
}

// ✅ Fetch all campaigns
export async function GET() {
  try {
    const campaigns = await prismaClient.campaign.findMany({
      include: { user: true, donations: true },
    });

    return NextResponse.json({ campaigns }, { status: 200 });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns." },
      { status: 500 },
    );
  }
}
