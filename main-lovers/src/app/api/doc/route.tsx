import { NextRequest, NextResponse } from "next/server";

// Get specific address with query
export async function GET(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: { query: string } }
) {
  
  res.sendFile("./index.html")
}