"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/types/database";
import { Lightbox } from "./lightbox";

interface PhotoGalleryProps {
  photos: Photo[];
  propertyName: string;
}

export function PhotoGallery({ photos, propertyName }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="w-full rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500 to-slate-600 aspect-video" />
    );
  }

  const heroPhoto = photos[0];
  // Thumbnails: photos 1–4 (up to 4 shown)
  const thumbnails = photos.slice(1, 5);
  const remainingCount = photos.length - 5; // photos beyond the 5 displayed (hero + 4 thumbs)

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* Hero image */}
        <button
          type="button"
          className="relative w-full overflow-hidden rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          style={{ aspectRatio: "16/9" }}
          onClick={() => openLightbox(0)}
          aria-label={`View ${propertyName} photos`}
        >
          <Image
            src={heroPhoto.url}
            alt={heroPhoto.caption ?? propertyName}
            fill
            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </button>

        {/* Thumbnail strip */}
        {thumbnails.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {thumbnails.map((photo, i) => {
              const originalIndex = i + 1; // offset by hero
              const isLast = i === 3 && remainingCount > 0;

              return (
                <button
                  key={photo.id}
                  type="button"
                  className="relative overflow-hidden rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  style={{ aspectRatio: "4/3" }}
                  onClick={() => openLightbox(originalIndex)}
                  aria-label={
                    isLast
                      ? `View all ${photos.length} photos`
                      : (photo.caption ?? `Photo ${originalIndex + 1}`)
                  }
                >
                  <Image
                    src={photo.url}
                    alt={photo.caption ?? `${propertyName} photo ${originalIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                    sizes="(max-width: 768px) 25vw, 300px"
                  />
                  {isLast && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        +{remainingCount + 1} more
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Lightbox
        photos={photos}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
