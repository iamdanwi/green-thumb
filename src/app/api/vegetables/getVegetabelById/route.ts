/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";

// GET /api/vegetables/getVegetableById?id=123
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const res = await fetch("https://azamsharp.com/vegetables.json");
    const data = await res.json();

    const vegetable = data.find((veg: any) => veg.VegetableId === parseInt(id));

    if (!vegetable) {
      return NextResponse.json(
        { error: "Vegetable not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(vegetable);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vegetables" },
      { status: 500 },
    );
  }
}
