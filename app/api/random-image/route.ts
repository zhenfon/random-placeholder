import { supabase } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabase.storage.from('placeholder-images').list();
    if (error || !data || data.length === 0) {
      return NextResponse.json({ message: 'No images found in the bucket' }, { status: 500 });
    }

    const randomImage = data[Math.floor(Math.random() * data.length)];
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/placeholder-images/${randomImage.name}`;

    const response = NextResponse.json({ url: imageUrl }, { status: 200 });

    // Set cache-control header to prevent caching
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving image', error }, { status: 500 });
  }
}
