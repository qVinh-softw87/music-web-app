"use client";

import { useState } from "react";
import { Skeleton } from "./Skeleton";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function LazyImage({ src, alt, className = "", containerClassName = "", ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-white/5 ${containerClassName}`}>
      {!isLoaded && <Skeleton className="absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${isLoaded ? "loaded" : "opacity-0"} transition-opacity duration-300 object-cover`}
        {...props}
      />
    </div>
  );
}
