"use client";

import { useState, useEffect } from 'react';
import { Copy } from "lucide-react";
import Image from 'next/image'; // Import Next.js Image component

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [imageApiUrl, setImageApiUrl] = useState<string | null>(null);

  // Fetch random image
  const fetchRandomImage = async () => {
    setIsLoading(true);  // Start loading
    try {
      const response = await fetch('/api/random-image');
      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Something went wrong",
          description: "An unexpected error occurred: " + errorData,
        });
        return;
      }

      const data = await response.json();
      setImageUrl(data.url);  // Set the actual image URL from the API response
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "An unexpected error occurred: " + error,
      });
    } finally {
      setIsLoading(false);  // End loading
    }
  };

  // Copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      if (imageApiUrl) {
        await navigator.clipboard.writeText(imageApiUrl);  // Use dynamic URL
        toast({
          title: "Success",
          description: "URL copied to clipboard!",
        });
      }
    } catch (error) {
      alert('Failed to copy URL: ' + error);
    }
  };

  // Set the API URL dynamically in the browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setImageApiUrl(`${window.location.origin}/api/random-image`);
    }
    fetchRandomImage();
  }, []);

  return (
    <div className='flex flex-grow justify-center items-center'>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Preview Placeholder Image</CardTitle>
          <CardDescription>Instantly generate random placeholder images for your projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-1">
              <Input value={imageApiUrl || ''} readOnly />  {/* Use dynamic origin */}
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </div>

            <div className="w-full flex justify-center mt-6">
              {isLoading ? (
                <AspectRatio ratio={1 / 1} className="w-[300px] h-[300px]">
                  <Skeleton className="w-full h-full rounded-lg" />  {/* Skeleton as a placeholder */}
                </AspectRatio>
              ) : (
                imageUrl && (  // Only render the image if imageUrl is set
                  <AspectRatio ratio={1 / 1} className="w-[300px] h-[300px]">
                    <Image
                      src={imageUrl}
                      alt="Random Placeholder"
                      fill   // Dynamically fills the parent container
                      className="object-cover rounded-lg"
                    />
                  </AspectRatio>
                )
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={fetchRandomImage} className="w-full">Shuffle</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
