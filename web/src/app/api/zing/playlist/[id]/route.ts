import { NextRequest, NextResponse } from 'next/server';
import { ZingMp3 } from 'zingmp3-api-full';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: 'Playlist ID is required' }, { status: 400 });
    }

    const data = await ZingMp3.getDetailPlaylist(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error('ZingMp3 getPlaylist Error:', error);
    return NextResponse.json({ error: 'Failed to get playlist info' }, { status: 500 });
  }
}
