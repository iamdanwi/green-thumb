import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const response = await axios.get("https://azamsharp.com/vegetables.json");
  return NextResponse.json(response.data);
}
