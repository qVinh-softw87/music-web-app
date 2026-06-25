import { NextResponse } from 'next/server';
import { ZingMp3 } from 'zingmp3-api-full';

export async function GET() {
  try {
    const data = await ZingMp3.getHome();
    return NextResponse.json(data);
  } catch (error) {
    console.error('ZingMp3 getHome Error:', error);
    return NextResponse.json({ error: 'Failed to fetch home data' }, { status: 500 });
  }
}
