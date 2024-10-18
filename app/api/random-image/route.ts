import { supabase } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export const runtime = 'edge';  // Enforce this function to run as an edge function

export async function GET() {
  try {
    // Fetch the list of images from Supabase storage
    const { data, error } = await supabase.storage.from('placeholder-images').list();
    if (error || !data || data.length === 0) {
      return new NextResponse('No images found in the bucket', { status: 500 });
    }

    // Select a random image
    const randomImage = data[Math.floor(Math.random() * data.length)];
    console.log('Random image selected:', randomImage);

    // Construct the image URL
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/placeholder-images/${randomImage.name}`;

    // Return the URL as plain text
    const response = new NextResponse(imageUrl, { status: 200, headers: { 'Content-Type': 'text/plain' } });

    // Set CORS headers to allow all origins
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    response.headers.set('x-vercel-cache', 'MISS');  // Added Vercel cache bypass header

    return response;
  } catch (error) {
    console.log(error);
    const response = new NextResponse('Error retrieving image', { status: 500, headers: { 'Content-Type': 'text/plain' } });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  }
}
