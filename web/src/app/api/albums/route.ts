import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const albums = await prisma.album.findMany({
      include: {
        artist: true,
        tracks: true,
      },
      orderBy: {
        id: 'asc'
      }
    });

    return NextResponse.json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    return NextResponse.json({ error: 'Failed to fetch albums' }, { status: 500 });
  }
}
