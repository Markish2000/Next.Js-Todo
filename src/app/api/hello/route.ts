import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: Request) {
  const response = { method: 'GET', hola: 'mundo' };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const response = { method: 'POST', hola: 'mundo' };

  return NextResponse.json(response);
}
