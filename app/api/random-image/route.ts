import { supabase } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabase.storage.from('placeholder-images').list();

    if (error || !data) {
      return NextResponse.json({ message: 'Failed to fetch images' }, { status: 500 });
    }

    if (data.length === 0) {
      return NextResponse.json({ message: 'No images found in the bucket' }, { status: 404 });
    }

    const randomImage = data[Math.floor(Math.random() * data.length)];
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/placeholder-images/${randomImage.name}`;

    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving image', error }, { status: 500 });
  }
}
