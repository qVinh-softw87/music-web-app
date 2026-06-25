import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const artists = await prisma.artist.findMany({
      include: {
        albums: true,
        tracks: true,
      },
      orderBy: {
        id: 'asc'
      }
    });

    return NextResponse.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 });
  }
}
