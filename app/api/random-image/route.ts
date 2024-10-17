import { supabase } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabase.storage.from('placeholder-images').list();
    if (error || !data || data.length === 0) {
      return NextResponse.json({ message: 'No images found in the bucket' }, { status: 500 });
    }

    // Select a random image from the fetched list
    const randomImage = data[Math.floor(Math.random() * data.length)];

    // Log the randomly selected image for debugging
    console.log('Random image selected:', randomImage);

    // Construct the image URL
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/placeholder-images/${randomImage.name}`;

    // Create a response with cache-control headers
    const response = NextResponse.json({ url: imageUrl }, { status: 200 });

    // Add headers to prevent caching and force cache miss on Vercel
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    response.headers.set('x-vercel-cache', 'MISS');  // Force Vercel cache miss

    return response;
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ message: 'Error retrieving image', error }, { status: 500 });
  }
}
