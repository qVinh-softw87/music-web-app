import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const tracks = await prisma.track.findMany({
      include: {
        artist: true,
        album: true,
      },
      orderBy: {
        id: 'asc'
      }
    });

    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch tracks' }, { status: 500 });
  }
}
