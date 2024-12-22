import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { lat, lng, donerdrone, engelseviyesi, sabitdrone, type, yedekguc, afettype, ekipkisi } = body;

        // Veritabanına kaydetme işlemi
        const newMarker = await db.marker.create({
            data: {
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                donerdrone: parseInt(donerdrone),
                engelseviyesi: parseInt(engelseviyesi),
                sabitdrone: parseInt(sabitdrone),
                type: type as 'ISTASYON' | 'ENGEL',
                afettype,
                ekipkisi: parseInt(ekipkisi),
                yedekguc: parseInt(yedekguc)
            },
        });

        console.log({newMarker})

        // Başarılı yanıt döndür
        return NextResponse.json({ success: true, message: 'Marker başarıyla eklendi', marker: newMarker }, { status: 201 });
    } catch (error) {
        console.error('Marker eklenirken hata oluştu:', error);
        return NextResponse.json({ success: false, message: 'Marker eklenirken bir hata oluştu' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const markers = await db.marker.findMany();
        return NextResponse.json(markers);
    } catch (error) {
        console.error('Error fetching markers:', error);
        return NextResponse.json({ error: 'Failed to fetch markers' }, { status: 500 });
    }
}