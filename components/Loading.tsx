"use client";
import { useEffect, useState, ReactNode } from "react";
import Image from "next/image";

interface LoadingProps {
  children: ReactNode;
}

export default function Loading({ children }: LoadingProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="rounded-lg p-6 shadow-xl">
          <div className="flex items-center gap-4 animate-bounce text-center">
            <Image src="/logo.svg" alt="logo" width={20} height={20} className="dark:invert" />
            <span className="text-xl font-bold">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}