"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function Footer() {
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(true); // Add type to the state
  const [lastScrollY, setLastScrollY] = useState<number>(0); // Add type to the scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight; // Maximum scrollable height

      // Ignore overscroll (bounce back) on mobile when scroll position is outside the valid range
      if (currentScrollY < 0 || currentScrollY > maxScrollY) {
        return;
      }

      if (currentScrollY - lastScrollY > 3) {
        // Scrolled down by at least 3px
        setIsFooterVisible(false);
      } else if (lastScrollY - currentScrollY > 3) {
        // Scrolled up by at least 3px
        setIsFooterVisible(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`w-full bg-[hsl(var(--background))] fixed bottom-0 transition-opacity duration-300 ease-in-out ${
        isFooterVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <Separator />
      <div className="px-3 py-1 flex justify-between items-center">
        <div>
          <span className="text-sm font-medium">Built with</span>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button className="pl-1 text-sm font-medium" variant="link">
                shadcn/ui
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex items-center justify-between gap-3">
                <Link href="https://x.com/shadcn" target="_blank">
                  <Button variant="link" className="text-sm pl-1">
                    Twitter/X
                  </Button>
                </Link>
                <Separator orientation="vertical" />
                <Link href="https://ui.shadcn.com/" target="_blank">
                  <Button variant="link" className="text-sm pl-1">
                    Website
                  </Button>
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div>
          <Link href="https://github.com/zhenfon/random-placeholder" target="_blank">
            <Button className="" variant="ghost" size="icon">
              <Github className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
