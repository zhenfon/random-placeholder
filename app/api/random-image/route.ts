import { supabase } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export const runtime = 'edge';  // Enforce this function to run as an edge function

export async function GET() {
  try {
    const { data, error } = await supabase.storage.from('placeholder-images').list();
    if (error || !data || data.length === 0) {
      return new NextResponse(JSON.stringify({ message: 'No images found in the bucket' }), { status: 500 });
    }

    // Select a random image
    const randomImage = data[Math.floor(Math.random() * data.length)];
    console.log('Random image selected:', randomImage);

    // Construct the image URL
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/placeholder-images/${randomImage.name}`;

    // Set CORS headers and cache-control headers
    const headers = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',  // Allow any domain to access
      'Access-Control-Allow-Methods': 'GET, OPTIONS',  // Allow specific HTTP methods
      'Access-Control-Allow-Headers': 'Content-Type',  // Allow specific headers
      'x-vercel-cache': 'MISS',  // Added Vercel cache bypass header
    };

    return new NextResponse(JSON.stringify({ url: imageUrl }), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Error retrieving image', error }), { status: 500 });
  }
}
