import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');

    if (isNaN(lat) || isNaN(lng)) {
        return NextResponse.json({ error: 'Invalid latitude or longitude' }, { status: 400 });
    }

    try {
        const marker = await db.marker.findFirst({
            where: {
                lat: lat,
                lng: lng
            }
        });

        if (!marker) {
            return NextResponse.json({ error: 'Marker not found' }, { status: 404 });
        }

        return NextResponse.json(marker);
    } catch (error) {
        console.error('Error fetching marker info:', error);
        return NextResponse.json({ error: 'Failed to fetch marker info' }, { status: 500 });
    }
}
