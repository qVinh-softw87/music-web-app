import { NextRequest, NextResponse } from 'next/server';
import { ZingMp3 } from 'zingmp3-api-full';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: 'Song ID is required' }, { status: 400 });
    }

    const info = await ZingMp3.getInfoSong(id);
    const streaming = await ZingMp3.getSong(id);

    return NextResponse.json({ info, streaming });
  } catch (error) {
    console.error('ZingMp3 getSong Error:', error);
    return NextResponse.json({ error: 'Failed to get song info' }, { status: 500 });
  }
}
