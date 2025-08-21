import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
const dotenv = require("dotenv");
dotenv.config();

export async function POST(req) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const expressRes = await fetch(`${process.env.BASE_URL}/api/cart`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await expressRes.json();
  return NextResponse.json(data);
}

