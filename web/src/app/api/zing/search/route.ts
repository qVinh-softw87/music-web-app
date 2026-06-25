import { NextRequest, NextResponse } from 'next/server';
import { ZingMp3 } from 'zingmp3-api-full';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    const data = await ZingMp3.search(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error('ZingMp3 search Error:', error);
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
  }
}
